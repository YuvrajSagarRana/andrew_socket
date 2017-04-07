const express=require('express'),
    path=require('path'),
    app=express();
const port=process.env.PORT||3000;
const publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log('Server is running'+port);
});