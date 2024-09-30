import { formatDataSet } from "./formatDataSet.js";

const data = formatDataSet();
// console.log(data, "==== Dataset")


// 1. Total sales of the store.
const calculateTotalSales = () => {
  return data.reduce((total, item) => total + item.totalPrice, 0);
};

// console.log(calculateTotalSales());

