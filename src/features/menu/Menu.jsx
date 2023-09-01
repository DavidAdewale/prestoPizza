import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurants';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="flex w-6/12 flex-wrap items-center justify-center gap-5">
      {menu.map(item => (
        <MenuItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
