import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  // const navigate = useNavigate();
  return (
    <form>
      <input
        placeholder="Search order no."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="rounded-full border-b border-amber-800 p-1 px-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:border-transparent focus:px-4 focus:outline-amber-500 sm:p-2 sm:px-4 sm:focus:px-8"
      />
    </form>
  );
}

export default SearchOrder;
