const fs = require("fs/promises");

// Lấy tất cả sản phẩm
const getAllOrder = async ()=>{
    // Lấy tất cả sản phẩm từ file json bằng fs ---- vì fs readfile là bất đồng bộ nên sẽ xử lý theo promise/async await
    const data = await fs.readFile("./data/orders.json")
    // Vì data nhận về là kiểu string nên phải convert về JSON đê thao tác 
    return JSON.parse(data);
}
/// Thêm sản phẩm
const addOrder = async (order)=>{
    const path_order_json = "./data/orders.json"
    const allOrders = await getAllOrder() 
    allOrders.push(order)
    await fs.writeFile(path_order_json, JSON.stringify(allOrders), 'utf8');
    return allOrders

}

/// Sửa sản phẩm
const updateOrder = async (id, quantity)=>{
    const path_order_json = "'./data/orders.json'"
    const allOrders = getAllOrder() 
   // Sửa phần từ thông qua index
    const index = allOrders.findIndex(m => m.id === id)
    /// Kiểm tra xem có tồn tại sản phẩm hay không
    if(index !== -1){
        allOrders.splice(index, 1,{
            ...allOrders[index],
           
            quantity: quantity
        })
    } else {
        console.log("Not found")
    }
    fs.writeFile(path_order_json, JSON.stringify(allOrders), 'utf8');
}
/// Sửa sản phẩm
const deleteOrder = async ()=>{

}

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getAllOrder
}