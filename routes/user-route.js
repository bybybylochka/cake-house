const express=require("express");
const userController=require("../controllers/user-controller");
const orderController = require("../controllers/order-controller");


const router=express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/check-authorization", userController.checkAuthorization)
router.get("/findByEmail", userController.findByEmail);
router.post("/findById", userController.findById);
router.post("/verify", userController.verify);
router.post("/update", userController.update);
router.get("/", userController.findAll);

module.exports=router