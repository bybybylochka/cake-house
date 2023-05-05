const express=require("express");
const productForOrderController=require("../controllers/product_for_order_controller");


const router=express.Router();

router.post("/find", productForOrderController.find);


module.exports=router