import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getLoginPage);
    router.post('/open-mainPage', homeController.getMainPage);
    router.get('/sign-up', homeController.getSignUpPage);
    router.post('/report-signUp', homeController.reportSignUp);
    router.post('/book-ticket', homeController.bookTicket);
    router.post('/getCustomerDetail', homeController.getCsDetail);
    /*
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/save-update', homeController.saveUpdate);
    */

    return app.use("/", router)
}

export default initWebRoute;
