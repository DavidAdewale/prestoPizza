import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div>
      {isLoading && <Loader />}
      <Header />
      <div>
        <main>
          <Outlet />
        </main>
        <CartOverview />
      </div>
    </div>
  );
}

export default AppLayout;
