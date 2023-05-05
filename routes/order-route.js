const express=require("express");
const orderController=require("../controllers/order-controller");


const router=express.Router();

router.post("/create", orderController.createOrder);
router.post("/find", orderController.find);
router.post("/findById", orderController.findOne);
router.get("/", orderController.findAll);


module.exports=router