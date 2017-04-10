/**
 * Created by Yuvraj Sagar Rana on 4/9/2017.
 */
var isRealString=(str)=>{

    return typeof str==String || str.trim().length>0 ;
}
module.exports={isRealString};