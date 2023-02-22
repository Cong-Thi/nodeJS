//yarn add express
const express = require('express');
const app = express();
//middleware chuyển đổi data json từ FE xuống express
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
app.use(express.static(".")); // định nghĩa lại url để sử dụng tài nguyên

const cors = require('cors');
const rootRouter = require('./routes/index');
app.use(cors());
const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"]
}
const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
//domain
app.listen(8080)

// const mysql = require('mysql2');
// //kết nối CSDL
// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "db_node",
//     port: 3306
// })

const rootRoute = require('./routes');

app.use("/api",rootRoute)