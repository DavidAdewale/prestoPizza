import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className=" flex w-full items-center justify-between bg-red-500 p-4 text-amber-950 shadow-sm">
      <Link className=" text-sm text-stone-50 sm:text-2xl">Presto Pizza</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
