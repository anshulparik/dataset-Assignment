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

// 4. Items generating most revenue in each month.
const findTopRevenueItem = () => {
  const itemRevenuePerMonth = {};

  data.forEach((item) => {
    const date = new Date(item?.date);
    const month = date.toISOString().slice(0, 7);

    if (!itemRevenuePerMonth[month]) {
      itemRevenuePerMonth[month] = {};
    }

    if (!itemRevenuePerMonth[month][item?.sku]) {
      itemRevenuePerMonth[month][item?.sku] = 0;
    }

    itemRevenuePerMonth[month][item?.sku] =
      itemRevenuePerMonth[month][item?.sku] + item?.totalPrice;
  });

  const topRevenueItem = {};
  for (const month in itemRevenuePerMonth) {
    let maxRevenue = 0;
    let topItem = "";
    for (const item in itemRevenuePerMonth[month]) {
      if (itemRevenuePerMonth[month][item] > maxRevenue) {
        maxRevenue = itemRevenuePerMonth[month][item];
        topItem = item;
      }
    }
    topRevenueItem[month] = topItem;
  }
  return topRevenueItem;
};

// 5. For the most popular item, find the min, max and average number of orders each month.
const findPopularItemStats = () => {
  const itemStats = {};
  const popularItemsPerMonth = findMostPopularItem();

  data.forEach((item) => {
    const date = new Date(item?.date);
    const month = date.toISOString().slice(0, 7);
    const popularItem = popularItemsPerMonth[month];

    if (item.sku === popularItem) {
      if (!itemStats[month]) itemStats[month] = [];
      itemStats[month].push(item.quantity);
    }
  });

  const result = {};
  for (const month in itemStats) {
    const quantities = itemStats[month];
    const min = Math.min(...quantities);
    const max = Math.max(...quantities);
    const avg = quantities.reduce((a, b) => a + b, 0) / quantities.length;
    result[month] = { min, max, avg: avg.toFixed(2) };
  }
  return result;
};

console.log("Total sales of the store.", calculateTotalSales());
console.log("Month wise sales totals.", calculateMonthWiseSales());
console.log(
  "Most popular item (most quantity sold) in each month.",
  findMostPopularItem()
);
console.log(
  "Items generating most revenue in each month.",
  findTopRevenueItem()
);
console.log(
  "For the most popular item, find the min, max and average number of orders each month.",
  findPopularItemStats()
);
