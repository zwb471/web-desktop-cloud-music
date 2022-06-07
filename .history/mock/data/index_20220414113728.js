const express = require('express')


const app = express();

app.get("/",(req,res)=>{
    res.send('ddddd')
})
app.listen(3300,()=>{
    console.log('启动成功');
    
})