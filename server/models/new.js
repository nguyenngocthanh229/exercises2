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

// const createOrders = async () => {
//   try {
//     const orders = JSON.parse(await fs.readFile("./data/orders.json"));
//     return orders;
//   } catch (error) {
//   }
// };
// const createOrders = async () => {
//   return JSON.parse(fs.readFile('./data/orders.json', 'utf8'));
// };

// const saveOrder = async (order) => {
//   const orders = createOrders();
//   orders.push(order);
//   fs.writeFile('./data/orders.json', JSON.stringify(orders), 'utf8');
// };

const arr = [1, 2, 2, 4, 5]
/// them  1 so bat ki vao mang
// sua 1 so bat ki trong mang
/// xoa 1 so bat ki

// /// them 1 so bat ki
// const addNumber = (number) =>{
//   arr.push(number)
//   return arr
// }
// /// sua  1 so bat ki
// const updateNumebr = (index, number) =>{
//   arr.splice(index, 1, number)
//   return arr
// }
// /// xoa  1 so bat ki
// const deleteNumebr = (index) =>{
//   arr.splice(index, 1)
//   return arr
// }



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