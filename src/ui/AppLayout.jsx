import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const location = useLocation();
  const isMenu = location.pathname === '/menu';
  return (
    <div>
      {isLoading && <Loader />}
      <Header />
      <div>
        <main>
          <Outlet />
        </main>
        {isMenu && <CartOverview />}
      </div>
    </div>
  );
}

export default AppLayout;
