const express = require('express')


const app = express();

app.get("/logi")
app.listen(3000,()=>{
    console.log('启动成功');
    
})