const express = require('express')


const app = express();

app.get("/login",(req,res)=>{
    res('')
})
app.listen(3000,()=>{
    console.log('启动成功');
    
})