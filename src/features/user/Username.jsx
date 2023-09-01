import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector(state => state.user.username);
  if (!username) return null;
  return <div className="text-lg text-stone-50">{username}</div>;
}

export default Username;
