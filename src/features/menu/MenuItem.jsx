import Button from '../../ui/Button';

function MenuItem({ item }) {
  const { id, name, imageUrl, ingredients, soldOut, unitPrice } = item;
  return (
    <li className="flex flex-col items-start gap-3 overflow-hidden rounded-lg bg-slate-50 p-2 shadow-lg">
      <img src={imageUrl} alt={`image of ${name}`} className="w-52" />
      <p className="font-medium uppercase">{name}</p>
      <Button type="small">Add to cart</Button>
    </li>
  );
}

export default MenuItem;
