import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  const username = useSelector(state => state.user.username);
  function handleClick() {
    navigate('/menu');
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-amber-950">
      <h1 className="text-center font-display text-3xl sm:text-5xl">
        Crafting Delicious Dreams
      </h1>
      <h4 className="text-xl">One pizza at a time</h4>
      {!username && <CreateUser />}
      {username && (
        <Button type="primary" onClick={handleClick}>
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Homepage;
