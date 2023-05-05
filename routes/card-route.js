const express=require("express");
const cardController=require("../controllers/card-controller");


const router=express.Router();

router.post("/create", cardController.createCard);
router.post("/find", cardController.find);

module.exports=router