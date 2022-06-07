const express = require('express')


const app = express();

app.get("/",(req,res)=>{
    res.send('ddddd')
})
app.listen(3300,()=>{
    console.log('3300启动成功');
    
})