import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utilities/helpers';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';
import DeleteItem from './DeleteItem';

function CartItem({ item }) {
  const { name, pizzaId, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <li className="grid w-full grid-cols-3 items-center gap-4 py-3">
      <p className="mt-3 text-sm font-medium md:text-lg">
        {quantity}&times; {name}
      </p>
      <div className="flex w-24 flex-col  justify-between gap-2 justify-self-center md:flex-row md:items-center md:justify-center">
        <UpdateItemQuantity
          currentQuantity={currentQuantity}
          pizzaId={pizzaId}
        />
      </div>
      <p className="justify-self-end text-sm md:text-lg">
        {formatCurrency(totalPrice)}
      </p>
    </li>
  );
}

export default CartItem;
