const { query, application } = require('express')
const express=require('express')
const app=express()
const mysql=require('mysql')
//connection
const db=mysql.createPool({
    user:'root',
    host:'localhost',
    password:'password',
    database:'task1sch'
})
//routes
//get all customers
app.get('/select',(req,res)=>{
    db.query(
     'SELECT * FROM CUSTOMER' ,
     (err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result)
     }  
    )
})
//get customer by id
app.get('/select/:id',(req,res)=>{
    const id=req.params.id;
    db.query(
        'SELECT * FROM CUSTOMER WHERE id='+id,
        (err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(result)
        }
    )
});
//update balance
app.put('/update/:id/:value',(req,res)=>{
    let id=req.params.id;
    let value=Number(req.params.value);
    var v=0;
    var total_v=0;
    db.query(
        'select custBalance from customer where id='+id,
        (err,result)=>{
            if(err){console.log(err);}
             let v2=result[0];
             v=v2.custBalance;
        });

    setTimeout(() => {
         total_v=v+value;
        db.query(
            'UPDATE customer SET custBalance= '+total_v + ' WHERE id= '+id,
            (err,result)=>{
                if(err){console.log(err);}
                res.send(result)
             });
    },500);
})








app.listen(3001,()=>{console.log('server is running');});