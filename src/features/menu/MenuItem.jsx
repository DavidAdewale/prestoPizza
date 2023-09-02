import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { addItem, getCart, getCurrentQuantityById } from '../cart/cartSlice';
import { capitalizeFirstLetter, formatCurrency } from '../../utilities/helpers';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import DeleteItem from '../cart/DeleteItem';

function MenuItem({ item }) {
  const { id, name, imageUrl, ingredients, soldOut, unitPrice } = item;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="max-w-52 flex flex-col items-start gap-3 overflow-hidden rounded-lg bg-slate-50 p-2 shadow-lg">
      <img
        src={imageUrl}
        alt={`image of ${name}`}
        className={`w-52 rounded-md ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="w-52 overflow-hidden">
        <p className="text-lg font-medium">{name}</p>
        <p className="w-full text-sm">
          {ingredients.map(item => capitalizeFirstLetter(item)).join(', ')}
        </p>
      </div>
      <p className="font-bold">{formatCurrency(unitPrice)}</p>

      {isInCart && (
        <div className="flex w-full items-center justify-between">
          <UpdateItemQuantity currentQuantity={currentQuantity} pizzaId={id} />
          <DeleteItem pizzaId={id} />
        </div>
      )}
      {soldOut && <div>Item sold out</div>}
      {!soldOut && !isInCart && (
        <Button type="small" onClick={handleAddToCart} disabled={soldOut}>
          Add to cart
        </Button>
      )}
    </li>
  );
}

export default MenuItem;
