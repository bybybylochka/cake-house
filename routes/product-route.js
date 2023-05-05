const express=require("express");
const productController=require("../controllers/product-controller");
const loader = require('../config/file-load-config')

const router=express.Router();

router.post("/create", loader.any(), productController.create);
router.get("/", productController.findAll);
router.post("/findOne", productController.findOne);
router.post("/update", productController.update);
router.delete("/delete", productController.delete);
router.post("/findType", productController.findType);

module.exports=router;