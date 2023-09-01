import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getMenu } from './services/apiRestaurants';
import Homepage from './pages/Homepage';
import AppLayout from './ui/AppLayout';
import Menu, { loader as menuLoader } from './features/menu/Menu';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/menu', element: <Menu />, loader: menuLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
