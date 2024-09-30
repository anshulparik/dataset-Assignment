import { formatDataSet } from "./formatDataSet.js";

const data = formatDataSet();


// 1. Total sales of the store.
const calculateTotalSales = () => {
  return data.reduce((total, item) => total + item.totalPrice, 0);
};



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



// 3. Most popular item (most quantity sold) in each month.
const findMostPopularItem = () => {
  const itemSalesPerMonth = {};

  data.forEach((item) => {
    const date = new Date(item?.date);
    const month = date.toISOString().slice(0, 7);

    if (!itemSalesPerMonth[month]) {
      itemSalesPerMonth[month] = {};
    }

    if (!itemSalesPerMonth[month][item?.sku]) {
      itemSalesPerMonth[month][item?.sku] = 0;
    }

    itemSalesPerMonth[month][item?.sku] =
      itemSalesPerMonth[month][item?.sku] + item?.quantity;
  });


  const mostPopularItem = {};
  for (const month in itemSalesPerMonth) {
    let quantity = 0,
      popularItem = 0;

    for (const item in itemSalesPerMonth[month]) {
      if (itemSalesPerMonth[month][item] > quantity) {
        quantity = itemSalesPerMonth[month][item];
        popularItem = item;
      }
    }

    mostPopularItem[month] = popularItem;
  }

  return mostPopularItem;
};
