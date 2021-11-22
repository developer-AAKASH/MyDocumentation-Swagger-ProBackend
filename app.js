const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup( swaggerDocument ));

app.get("/", ( request, response )=>{
    response.send("Welcome to our App !!!!");
});

app.listen( 4000, ()=>{
    console.log(`App is running on port 4000.....`);
});