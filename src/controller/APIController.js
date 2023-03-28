import pool from '../configs/connectDB';

/*
let getAllUsers =async (req,res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `customer`');
    return res.status(200).json({
        message : 'ok',
        data : rows
    })
}
let createNewUser = async (req,res) => {
    let {name,phoneNumber} = req.body;
    if(!name || !phoneNumber){
        return res.status(200).json({
            message : 'missing params required'
        })
    }
    await pool.execute("insert into customer(name,phoneNumber) values(?,?)", [name,phoneNumber]);
    return res.status(200).json({
        message : 'ok'
    })
}
let updateUser = async (req,res) => {
    let {name,phoneNumber,customer_id} = req.body;
    if(!name || !phoneNumber || !customer_id){
        return res.status(200).json({
            message : 'missing params required'
        })
    }
    await pool.execute("update customer set name=? , phoneNumber=? where customer_id=?", [name,phoneNumber,customer_id]);
    return res.status(200).json({
        message : 'ok'
    })
}
let deleteUser = async (req,res) => {
    let customer_id = req.params.customer_id;
    if(!customer_id){
        return res.status(200).json({
            message : 'missing params required'
        })
    }
    await pool.execute("delete from customer where customer_id = ?", [customer_id]);
    return res.status(200).json({
        message : 'ok'
    })
}
module.exports = {
    getAllUsers,createNewUser,updateUser,deleteUser
}
*/

let getPaymentPage = (req,res) => {
    return res.render("report-payment.ejs",{ticket_id:req.body.ticket_id,ac_id:req.body.ac_id,username:req.body.username,password:req.body.password})
}
let updatePayment =async (req,res) => {
    let {ac_id,ticket_id,username,password,STK} = req.body
    await pool.execute("update ticket set status=? where ticket_id=?",[1,ticket_id]);
    const [rows, fields] = await pool.execute('SELECT * from customer as c join ticket as t on c.customer_id = t.customer_id where account_id =?',[ac_id]);
    return res.render("csDetail.ejs",{user:rows,ac_id:ac_id,username:username,password:password})
}
module.exports = {
    getPaymentPage,updatePayment
}