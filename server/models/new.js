const fs = require("fs/promises");

const getMenu = async () => {
  // const 
  const menu = JSON.parse(await fs.readFile("./data/menu.json"));
  return menu;
};

const getBusinessHours = async (day) => {
  const businessHours = JSON.parse(await fs.readFile("./data/business_hour.json"));
  return businessHours[day];
};



const createOrders = async (order) => {
  const orders = await createOrders();
  orders.push(order);
  await fs.writeFile("./data/orders.json", JSON.stringify(orders));
  return JSON.parse(orders);
};


module.exports = {
  getMenu,
  getBusinessHours,
  createOrders,
  // saveOrder
};