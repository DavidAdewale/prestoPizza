import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurants';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="flex  flex-wrap items-center justify-center gap-5 p-8">
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
