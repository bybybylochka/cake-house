const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");

const routerProduct=require("./routes/product-route");
const routerUser=require("./routes/user-route");
const routerOrder=require("./routes/order-route");
const routerAddress=require("./routes/address-route");
const routerCard=require("./routes/card-route");
const routerPromocode=require("./routes/promocode-route");
const routerProductsForOrder=require("./routes/product_for_order-route");

const app=express();

// устранение ошибки cors-policy
app.use(cors());
//настройка обработки тела запросов в формате json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/products", routerProduct);
app.use("/user", routerUser);
app.use("/orders", routerOrder);
app.use("/addresses", routerAddress);
app.use("/cards", routerCard);
app.use("/promocodes", routerPromocode);
app.use("/productsForOrder", routerProductsForOrder);

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


const port=3000;
app.listen(port);

