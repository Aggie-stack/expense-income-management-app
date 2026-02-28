export const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.amount, 0);
};