const express = require("express");
const News = require("../controllers/new");

const router = express.Router();

router.get("/menu", News.getMenu);
router.get("/business_hours/:day", News.getBusinessHours);
router.post("/orders", News.createOrders);

module.exports = router