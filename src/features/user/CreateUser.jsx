import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateName } from './userSlice';
import { capitalizeFirstLetter } from '../../utilities/helpers';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const nameOfUser = capitalizeFirstLetter(username);
    dispatch(updateName(nameOfUser));
    setUsername('');
    navigate('/menu');
  }
  return (
    <form
      className="flex flex-col items-center justify-center gap-2"
      onSubmit={handleSubmit}
    >
      <p>Please start by telling us your name</p>
      <input
        placeholder="Full name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="rounded-full border-2  border-amber-950 p-2 px-4 outline-none transition-all focus:border-amber-500 focus:px-8"
      />
    </form>
  );
}

export default CreateUser;
