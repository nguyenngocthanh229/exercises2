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


module.exports = {
  getMenu,
  getBusinessHours,
  createOrders
};