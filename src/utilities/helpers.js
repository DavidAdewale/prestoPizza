export function capitalizeFirstLetter(str) {
  const stringArr = str.split(/-| /);
  if (stringArr.length >= 2) {
    const newArr = stringArr.map(
      string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(),
    );
    return newArr.join(' ');
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatCurrency(value) {
  const amount = value * 350;

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
