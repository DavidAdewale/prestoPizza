import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurants';
import Button from '../../ui/Button';

function UpdateOrder() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">
        {isSubmitting ? 'Sending...' : 'Make priority'}
      </Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}
export default UpdateOrder;
