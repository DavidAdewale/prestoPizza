import { capitalizeFirstLetter, formatCurrency } from '../../utilities/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { name, pizzaId, quantity, totalPrice, unitPrice } = item;

  return (
    <div className="flex w-full items-center justify-between border-b-2 py-4 text-sm md:text-lg">
      <div>
        <h3>
          {quantity}&times; {name}
        </h3>
        <p className="text-sm">
          {isLoadingIngredients && 'Loading...'}
          {ingredients.length > 0 &&
            ingredients
              .map(ingredient => capitalizeFirstLetter(ingredient))
              .join(' ,')}
        </p>
      </div>
      <p>{formatCurrency(totalPrice)}</p>
    </div>
  );
}

export default OrderItem;
