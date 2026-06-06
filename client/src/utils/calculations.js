export const calculateTotal = (items) => {
  return items.reduce((total, item) => total + Number(item.amount), 0);
};