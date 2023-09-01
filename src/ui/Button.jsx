function Button({ children, onClick, type, disabled, to }) {
  const base = 'inline-block rounded-full transition-all duration-300';

  const styles = {
    primary: base + ' bg-red-500 text-stone-50 p-2 px-4 hover:px-8 text-lg',
    secondary:
      base +
      ' border-red-500 border-2 p-2 px-4 text-red-500 hover:px-8 text-lg',
    small: base + ' bg-red-500 text-stone-50 p-2 px-4 hover:px-6',
  };

  if (onClick)
    return (
      <button className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return <button className={styles[type]}>{children}</button>;
}

export default Button;
