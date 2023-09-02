import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import Button from '../../ui/Button';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleInc() {
    dispatch(increaseItemQuantity(pizzaId));
  }

  function handleDec() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-3">
      <Button type="round" onClick={handleDec}>
        -
      </Button>
      {currentQuantity}

      <Button type="round" onClick={handleInc}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
