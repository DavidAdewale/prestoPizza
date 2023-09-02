import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserName } from '../user/userSlice';
import { getCart, getTotalCartPrice } from './cartSlice';
import CartItem from './CartItem';
import { formatCurrency } from '../../utilities/helpers';
import EmptyCart from '../../ui/EmptyCart';

function Cart() {
  const username = useSelector(getUserName);
  const cart = useSelector(getCart);
  const totalAmount = useSelector(getTotalCartPrice);
  console.log(cart);
  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="rounded-lg bg-slate-50 p-8 sm:w-3/5  ">
        <Link to="/menu">&larr; Back to menu</Link>
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
    </div>
  );
}

export default Cart;
