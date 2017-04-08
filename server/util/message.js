/**
 * Created by Yuvraj Sagar Rana on 4/7/2017.
 */
var generateMessage=(from, text)=>{
 return {
     from,
     text,
     createdAt:new Date().getTime()
 };
};
module.exports={generateMessage};