import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import EmptyCart from '../../ui/EmptyCart';
import Button from '../../ui/Button';
import { fetchAdress } from '../user/userSlice';
import { formatCurrency } from '../../utilities/helpers';
import { createOrder } from '../../services/apiRestaurants';
import store from '../../store';

export const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
  } = useSelector(state => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const totalCartPrice = useSelector(getTotalCartPrice);
  const [withPriority, setWithPriority] = useState(false);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const dispatch = useDispatch();

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  if (!cart.length)
    return (
      <div className="flex justify-center p-10">
        <EmptyCart />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="mt-5 text-xl font-medium">
        Ready to order? let&lsquo;s go!
      </h2>

      <Form method="POST">
        <div className="form-field">
          <label className="text-lg">First name</label>
          <input
            className="input"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>
        <div className="form-field">
          <label className="text-lg">Phone number</label>
          <input className="input" type="tel" name="phone" required />
        </div>
        {formErrors?.phone && (
          <p className="mt-3 rounded-lg bg-red-200 p-2 px-4 text-red-500">
            {formErrors.phone}
          </p>
        )}
        <div className="relative">
          <div className="form-field">
            <label className="text-lg">Address</label>
            <input
              className="input"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-3 rounded-lg bg-red-200 p-2 px-4 text-red-500">
                There was a problem getting your address. Make sure to fill this
                field
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <span className="absolute right-0 ">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={e => {
                    e.preventDefault();
                    dispatch(fetchAdress());
                  }}
                >
                  {isLoadingAddress ? 'Getting Address' : 'Get Location'}
                </Button>
              </span>
            )}
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <input
            className="h-4 w-4 accent-red-500"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>
        <div className="mt-5">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  // console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number, we might need to contact you';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log(newOrder);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
