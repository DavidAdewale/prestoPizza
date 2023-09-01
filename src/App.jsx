import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getMenu } from './services/apiRestaurants';
import Homepage from './pages/Homepage';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  { element: <AppLayout />, 
  children: [
  {path: '/', element: <Homepage/>},
   
] }]);

function App() {
  async function menu() {
    const menu2 = await getMenu();
    console.log(menu2);

    return menu2;
  }
  menu();

  return <RouterProvider router={router} />;
}

export default App;
