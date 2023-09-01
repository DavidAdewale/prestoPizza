import CreateUser from '../features/user/CreateUser';

function Homepage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 text-amber-950">
      <h1 className="text-5xl ">Crafting Delicious Dreams</h1>
      <h4 className="text-xl">One pizza at a time</h4>
      <CreateUser />
    </div>
  );
}

export default Homepage;
