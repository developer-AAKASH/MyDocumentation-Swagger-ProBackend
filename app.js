const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

const app = express();

app.use( express.json() );
app.use( fileUpload() );

let courses = [
    {
        id: "102",
        name: "Learn Java",
        price: 199
    },
    {
        id: "101",
        name: "Learn C++",
        price: 299
    },
    {
        id: "103",
        name: "Learn JavaScript",
        price: 399
    }
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup( swaggerDocument ));

app.get("/", ( request, response )=>{
    response.send("Welcome to our App !!!!");
});

app.get("/api/v1/aakash", ( request, response )=>{
    response.send("Welcome to our App !!!!");
});

app.get("/api/v1/aakashObject", ( request, response )=>{
    response.send({ id: "111", name: "Competitive Programming", price: 1999 });
});

app.get("/api/v1/aakashArray", ( request, response )=>{
    response.send( courses );
});

app.get("/api/v1/mycourse/:courseId", ( request, response )=>{
    const myCourse = courses.find( (course) => course.id === request.params.courseId );

    console.log( myCourse );

    response.send( myCourse );
});

app.post("/api/v1/add", ( request, response )=>{
    console.log( request.body );

    courses.push( request.body );

    response.send( true );
});

app.get("/api/v1/coursequery", ( request, response )=>{
    let location = request.query.location;
    let device = request.query.device;

    response.send({
        location,
        device
    });
});

app.post("/api/v1/imagefile", ( request, response )=>{
    console.log( request.headers );
    const file = request.files.file;

    let path = __dirname + "/images/" + Date.now() + ".jpg";

    file.mv( path, ( error )=>{
        response.send( true );
    });
});

app.listen( 4000, ()=>{
    console.log(`App is running on port 4000.....`);
});