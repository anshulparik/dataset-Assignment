import { formatDataSet } from "./formatDataSet.js";

const data = formatDataSet();
// console.log(data, "==== Dataset")

// 1. Total sales of the store.
const calculateTotalSales = () => {
  return data.reduce((total, item) => total + item.totalPrice, 0);
};
// console.log(calculateTotalSales());




// 2. Month wise sales totals.
const calculateMonthWiseSales = () => {
  const monthWiseSales = {};
  data.forEach((item) => {
    const date = new Date(item?.date);
    const month = date.toISOString().slice(0, 7);
    if (!monthWiseSales[month]) {
      monthWiseSales[month] = 0;
    }
    monthWiseSales[month] = monthWiseSales[month] + item.totalPrice;
  });
  return monthWiseSales;
};
// console.log(calculateMonthWiseSales());
