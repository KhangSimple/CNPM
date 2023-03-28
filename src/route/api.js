import express from "express";
import APIController from '../controller/APIController';
let router = express.Router();

const initAPIRoute = (app) => {
    /*
    router.get('/users', APIController.getAllUsers);
    router.post('/create-user',APIController.createNewUser)
    router.put('/update-user',APIController.updateUser)
    router.post('/detele-user',APIController.deleteUser)
    */
    router.post('/getPaymentPage', APIController.getPaymentPage);
    router.post('/updatePayment', APIController.updatePayment);
    return app.use("/", router)

}

export default initAPIRoute;
