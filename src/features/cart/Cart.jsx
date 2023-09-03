import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from '../user/userSlice';
import { clearCart, getCart, getTotalCartPrice } from './cartSlice';
import CartItem from './CartItem';
import { formatCurrency } from '../../utilities/helpers';
import EmptyCart from '../../ui/EmptyCart';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const username = useSelector(getUserName);
  const cart = useSelector(getCart);
  const totalAmount = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-5 ">
      <div className="w-full rounded-lg bg-slate-50 p-4 shadow-xl sm:w-2/5 md:p-8">
        <Button type="link" to="/menu">
          &larr; Back to menu
        </Button>
        {cart.length === 0 && <EmptyCart />}
        {cart.length > 0 && (
          <>
            <h2 className="mt-5 text-lg font-medium">Your cart, {username}</h2>

            <ul>
              {cart.map(item => (
                <CartItem item={item} key={item.pizzaId} />
              ))}
            </ul>
            <div className="border-1 mt-5 flex justify-between border-y py-3">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
            </div>
          </>
        )}
      </div>
      {cart.length > 0 && (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => navigate('/order/new')}>
            Order now
          </Button>
          <Button type="secondary" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
