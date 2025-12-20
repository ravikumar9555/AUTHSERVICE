const express = require("express");
const {PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
//const userService = require('../src/services/user-service')
const apiRoutes = require('./routes/index')
const db = require('./models/index')
const {User} = require('./models/index');
const {Role} = require("./models/index");
const setupAndStartServer = async () => {

    // create the express object
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api' ,apiRoutes)
    //const service = new userService();
    // const newToken = service.createToken({
    //     email:"email@gmail.com", id: 1
    // });
    // console.log("new token us ", newToken);
    // const resp = service.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3NjYxNTEyNjEsImV4cCI6MTc2NjE1NDg2MX0.3NcpJmzR7JPxuz3waoWjRCHnxkgMDXu3FFdVVePuEqY");
    // console.log(resp);


    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.DB_SYNC){
           db.sequelize.sync({alter: true});
        }
        // const u1 = await User.findByPk(12);
        // const r1 = await Role.findByPk(2);
        // u1.addRoles(r1);
    
    });
}

setupAndStartServer();