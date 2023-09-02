function Button({ children, onClick, type, disabled, to }) {
  const base = 'inline-block rounded-full transition-all duration-300';

  const styles = {
    primary: base + ' bg-red-500 text-stone-50 p-2 px-4 hover:px-8 text-lg',
    secondary:
      base +
      ' border-red-500 border-2 p-2 px-4 text-red-500 hover:px-8 text-lg hover:bg-red-700',
    small:
      base +
      ' bg-red-500 text-stone-50 p-2 px-4 hover:px-6 text-sm hover:bg-red-700',
    round:
      'inline-block rounded-full transition-all duration-300 bg-red-500 px-1.5 py-0.1 md:px-2.5 md:py-1 text-sm text-stone-50 hover:scale-105 hover:bg-red-700',
  };

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
