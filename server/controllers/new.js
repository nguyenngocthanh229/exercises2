const asyncHandler = require("express-async-handler");
const New = require("../models/new");
const { getAllOrder, addOrder } = require("../models/order");



const getMenu = asyncHandler(async (req, res) => {
  const menu = await New.getMenu();
  res.send(menu);
});

const getBusinessHours = asyncHandler(async (req, res) => {
  const day = req.params.day;
  const hours = await New.getBusinessHours(day);
  if (!hours) {
    return res.status(400).send(`Invalid day: ${day}`);
  }
  res.send(hours);
});


const createOrders =async (req, res) => {
  /**
   * Ten mon: CHeck menu 
   * So luong
   */
  const {orders, customer, table} = req.body
  //  Doc ta ca mon an tu menu
  const getAllMenu = await  New.getMenu();
  // ramen Tonkotsu ramen
  let listAdd = []
  let totalPrice = 0  // khởi tạo biến tính tổng tiền
  for(const [key, value] of Object.entries(getAllMenu))
  {
    // console.log("key", key)
    // console.log("================")
    // console.log("value", value)
    for(const element of value) {
      for(const order of orders) {
        if(element.id === order.id && element.available){
          listAdd.push(order)
          totalPrice += element.price * order.quantity // tính tổng tiền
        }
      }
    }  
  }
  const formateOder = {
    customer: customer,
    table: table,
    order: listAdd,
    total: totalPrice  // thêm tổng tiền vào đơn hàng
  }
  const allOrders = await addOrder(formateOder)
  res.status(200).json(allOrders)
  res.json("OK")
};
// const createOrders = async (req, res) => {
//   const { orders, customer, table } = req.body;

//   try {
//     // Kiểm tra xem các món ăn có tồn tại trong hệ thống và còn sẵn có hay không
//     const allMenu = await New.getMenu();
//     const validOrders = [];
//     let total = 0;
//     for (const order of orders) {
//       const menuItem = allMenu.find(item => item.id === order.id);
//       if (menuItem && menuItem.available) {
//         validOrders.push({ id: menuItem.id, name: menuItem.name, quantity: order.quantity, price: menuItem.price });
//         total += menuItem.price * order.quantity;
//       }
//     }

//     // Tạo đơn hàng và lưu vào tệp JSON
//     const formattedOrder = {
//       customer: customer,
//       table: table,
//       order: validOrders,
//       total: total
//     };
//     const allOrders = await addOrder(formattedOrder);

//     // Trả về chi tiết đơn hàng và tổng số tiền
//     res.status(200).json(formattedOrder);
//   } catch (error) {
//     // Xử lý lỗi và trả về thông báo lỗi
//     console.error(error);
//     res.status(500).json({ message: "Có lỗi xảy ra khi đặt hàng!" });
//   }
// };

module.exports = {
  getMenu,
  getBusinessHours,
  createOrders
};