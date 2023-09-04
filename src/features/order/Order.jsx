import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurants';
import { calcMinutesLeft, formatCurrency } from '../../utilities/helpers';
import OrderItem from './OrderItem';
import Button from '../../ui/Button';
import UpdateOrder from './UpdateOrder';
import { useEffect } from 'react';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  const {
    cart,
    customer,
    estimatedDelivery,
    id,
    orderPrice,
    priority,
    priorityPrice,
    status,
  } = order;

  const toBeDelivered = calcMinutesLeft(estimatedDelivery) > 0;

  const options = {
    weekday: 'short',

    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-col items-center justify-center rounded-lg bg-slate-50 p-4 shadow-lg md:w-3/6">
        <div className="flex w-full justify-between border-b-2 py-2">
          <h3 className="text-md md:text-xl">Order #{id} status</h3>
          <div className="flex items-center gap-3">
            {priority && (
              <span className="rounded-full bg-red-500 p-1 px-2 text-xs font-medium uppercase text-slate-50 md:p-2 md:px-4 md:text-sm">
                Priority
              </span>
            )}
            {toBeDelivered ? (
              <span className="rounded-full bg-amber-500 p-1 px-2 text-xs font-medium uppercase text-slate-50 md:p-2 md:px-4 md:text-sm">
                {status}
              </span>
            ) : (
              <span className="rounded-full bg-green-500 p-1 px-2 text-xs font-medium uppercase text-slate-50 md:p-2 md:px-4 md:text-sm">
                Order delivered
              </span>
            )}
          </div>
        </div>
        {toBeDelivered && (
          <div className="mt-4 flex w-full justify-between rounded-lg bg-slate-200 p-4">
            <h3 className="text-xs font-medium md:text-sm ">
              {toBeDelivered
                ? `${calcMinutesLeft(estimatedDelivery)} minutes left`
                : 'Order delivered'}
            </h3>
            <p className="text-xs md:text-sm">
              (Est. delivery time:{' '}
              {new Date(estimatedDelivery).toLocaleString('en-US', options)})
            </p>
          </div>
        )}
        <div className="w-full p-4">
          {cart.map(item => (
            <OrderItem
              item={item}
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state === 'loading'}
              ingredients={
                fetcher?.data?.find(element => element.id === item.pizzaId)
                  ?.ingredients ?? []
              }
            />
          ))}
        </div>
        <div className="flex w-full flex-col gap-3 rounded-lg bg-slate-200 p-4">
          <p>
            {toBeDelivered ? 'Delivering' : 'Delivered'} to:{' '}
            <span className="font-medium">{customer}</span>
          </p>
          <h3 className="text-lg">
            Total pizza cost:{' '}
            <span className="font-medium">
              {formatCurrency(orderPrice + priorityPrice)}
            </span>
          </h3>
          {priority && (
            <div className="flex justify-between rounded-lg bg-stone-50 p-2 px-4">
              <p className="lg:text-md text-xs md:text-sm">
                Pizza price: {formatCurrency(orderPrice)}
              </p>
              <p className="lg:text-md text-xs md:text-sm">
                Priority price: {formatCurrency(priorityPrice)}
              </p>
            </div>
          )}
        </div>
      </div>
      {!priority && toBeDelivered && (
        <div>
          <UpdateOrder />
        </div>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
