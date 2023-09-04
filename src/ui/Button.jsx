import { Link } from 'react-router-dom';

function Button({ children, onClick, type, disabled, to }) {
  const base = 'inline-block rounded-full transition-all duration-300';

  const styles = {
    primary:
      base +
      ' bg-red-500 text-stone-50 py-2 px-4 text-sm hover:px-8 text-lg md:p-2 md:px-4 md:text-lg hover:bg-red-700',
    secondary:
      base +
      ' border-red-500 border py-2 px-4 text-sm text-red-500 hover:px-8 hover:bg-red-700 hover:bg-red-700 hover:text-stone-50 md:p-2 md:px-4 md:text-lg md:border-2',
    small:
      base +
      ' bg-red-500 text-stone-50 p-2 px-4 hover:px-6 text-sm hover:bg-red-700',
    round:
      'inline-block rounded-full transition-all duration-300 bg-red-500 px-1.5 py-0.1 md:px-2.5 md:py-1 text-sm text-stone-50 hover:scale-105 hover:bg-red-700',
    link: 'hover:text-red-600 hover:underline',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={styles[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
