const Order = require("../Models/order");

module.exports.allorder = async (req, res) => {
  const allOrders = await Order.find({}).populate("userId").populate("items");

  res.render("orders/allorder.ejs", { allOrders });
};
module.exports.orderform = (req, res) => {
  res.render("orders/orderform.ejs");
};
module.exports.order = async (req, res) => {
  let { items, totalAmount, status } = req.body.order;
  const neworder = new Order({
    items,
    totalAmount,
    status,
    createdAt: new Date(),
  });
  neworder.userId = req.user._id;
  await neworder.save();
  await neworder.populate("userId");
  res.render("orders/orderinfo.ejs", { neworder });
};
