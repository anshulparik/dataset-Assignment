import { dataset } from "./dataSet.js";

export const formatDataSet = () => {
  const arrayDataSet = dataset?.trim()?.split("\n");
  const usableDataSet = arrayDataSet.slice(1);

  const data = usableDataSet?.map((item) => {
    const [date, sku, unitPrice, quantity, totalPrice] = item.split(",");
    return {
      date,
      sku,
      unitPrice: +unitPrice,
      quantity: +quantity,
      totalPrice: +totalPrice,
    };
  });
  
  return data;
};
