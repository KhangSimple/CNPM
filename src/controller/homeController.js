import { json } from "body-parser";
import pool from "../configs/connectDB";

let MAX_LENGTH_USERNAME = 5;
let MAX_LENGTH_PASSWORD = 6
/*
let getHomepage =async (req,res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `customer`');
    return res.render('index.ejs', {dataUser : rows })

}

let getDetailPage =async (req,res) => {
    let customer_id = req.params.id;
    let user = await pool.execute("Select* from customer where customer_id = ?", [customer_id]);

    return res.send(JSON.stringify(user[0]));
}
let createNewUser =async (req,res) => {
    console.log("Check req:", req.body);
    let {name,phoneNumber} = req.body;
    await pool.execute("insert into customer(name,phoneNumber) values(?,?)", [name,phoneNumber]);
    return res.redirect('/');
}
let deleteUser =async (req,res) => {
    let customer_id = req.body.customer_id;
    await pool.execute("delete from customer where customer_id = ?", [customer_id]);
    return res.redirect('/');
}

let getEditPage =async (req,res) => {
    let id = req.params.id;
    let [user] = await pool.execute("select * from customer where customer_id = ?",[id]);
    return res.render("update.ejs", {userInfo: user[0]});
}
let saveUpdate =async (req,res) => {
    let user = req.body;
    await pool.execute("update customer set name=? , phoneNumber=? where customer_id=?", [user.Name,user.phoneNumber,user.customer_id]);
    return res.redirect('/');
}
module.exports = {
    getHomepage,getDetailPage,createNewUser,deleteUser,getEditPage,saveUpdate
}
*/
let getLoginPage = (req,res) => {
    return res.render('signIn.ejs',{checkUsername:1,checkPassword:1});
}
let getSignUpPage = (req,res) => {
    return res.render("signUp.ejs",{checkUsername:0,checkPassword:0,checkRePassword:0});
}
let reportSignUp =async (req,res) => {
    let checkUsername = 0;
    let checkPassword = 0;
    let checkRePassword = 0;
    let {username,password,re_password} = req.body;
    let check = await pool.execute("select count(username) as ct from account where username=?",[username]);
    if(password!=re_password || username.length < MAX_LENGTH_USERNAME || password.length<MAX_LENGTH_PASSWORD || check[0][0].ct >= 1){
        if(username.length < MAX_LENGTH_USERNAME){
            checkUsername = 1;
            // Để trống username
        }
        else if(check[0][0].ct >= 1){
            checkUsername = 2;
            console.log("Tài khoản đã tồn tại");
        }
        else if (password.length < MAX_LENGTH_PASSWORD){
            checkPassword = 1;
        }
        else if (password!=re_password){
            checkRePassword = 1;
        }
        return res.render("signUp.ejs",{checkUsername:checkUsername,checkPassword:checkPassword,checkRePassword:checkRePassword});
    }
    var customer_id = Math.floor(Math.random() * 100000) + 1
    await pool.execute("insert into account(account_id,username,password) values(?,?,?)",[customer_id,username,password]);
    return res.render("report-signUp.ejs",{id : customer_id});
}
let getMainPage =async (req,res) => {
    let {username,password} = req.body;
    let checkUsername = await pool.execute("select count(username) as ct from account where username=?",[username]);
    let checkPassword = await pool.execute("select count(username) as ct from account where username=? and password=?",[username,password]);
    if(checkUsername[0][0].ct == 1 && checkPassword[0][0].ct == 1){
        const [rows, fields] = await pool.execute('SELECT account_id,username,password FROM account where username=?',[username]);
        return res.render('index.ejs', {user : rows[0],dataUser: rows })
    }
    return res.render('signIn.ejs',{checkUsername:checkUsername[0][0].ct,checkPassword:checkPassword[0][0].ct});
}
let bookTicket = async (req,res) => {
    let{account_id,username,password,name,start,destination,startDate,khuahoi,phone,email,address,message} = req.body;
    /*await pool.execute("insert into customer(account_id,name,phoneNumber,email,address) values(?,?,?,?,?)"
    ,[account_id,name,phone,email,address]);*/
    let cs_id = await pool.execute("select max(customer_id) as m from customer");
    let customer_id = cs_id[0][0].m;
    let type = 'Khứa hồi';
    if(!khuahoi){
        type = 'Một chiều';
    }

    /*await pool.execute("insert into ticket(customer_id,station_start,destination,cost,start_date,return_date,type,message) values(?,?,?,?,?,?,?,?)"
    ,[customer_id,start,destination,200.0,startDate,khuahoi,type,message]);*/
    let ticket_id = await pool.execute("select max(ticket_id) as m from ticket");
    let tk_id = ticket_id[0][0].m;
    res.render("report.ejs", {tk_id:tk_id,ac_id:account_id,username:username,password:password});
}

let getCsDetail =async (req,res) => {
    let {ac_id,username,password} = req.body;
    const [rows, fields] = await pool.execute('SELECT * from customer as c join ticket as t on c.customer_id = t.customer_id where account_id =?',[req.body.search]);
    return res.render("csDetail.ejs",{user:rows, ac_id:req.body.search,username:username,password:password});
}
let getStationInfo = (req,res) => {
    let id = req.params.id;
    let {username,password} = req.body;
    if(id == 0)
        return res.render("LB_StationInfo.ejs",{username:username,password:password});
    if(id == 1)
        return res.render("HN_StationInfo.ejs",{username:username,password:password});
    if(id == 2)
        return res.render("LC_StationInfo.ejs",{username:username,password:password});
    if(id == 3)
        return res.render("DN_StationInfo.ejs",{username:username,password:password});
    return res.send("Error")
}
module.exports = {
    getLoginPage,getMainPage,bookTicket,getSignUpPage,reportSignUp,getCsDetail,getStationInfo
}

function alertWrongPass() {
    alert("Mật khẩu không khớp");
}