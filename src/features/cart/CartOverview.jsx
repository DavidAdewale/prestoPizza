import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utilities/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (totalCartQuantity < 1) return;
  return (
    <div className="fixed bottom-0 flex h-10 w-full justify-between bg-slate-900 p-2 px-4 text-slate-50">
      <div className="flex gap-3">
        <p className="flex gap-1">
          {totalCartQuantity} pizza{totalCartQuantity > 1 ? 's' : ''}
        </p>
        <p>{formatCurrency(totalCartPrice)}</p>
      </div>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
