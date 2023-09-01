import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <header className="fixed flex w-screen items-center justify-between bg-red-500 p-4 text-amber-950 shadow-sm">
      <Link className=" text-2xl text-stone-50">Presto Pizza</Link>
      <SearchOrder />
    </header>
  );
}

export default Header;
