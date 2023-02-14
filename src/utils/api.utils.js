const STATUS={
    OK:200,
    CREATED:201,
    BAD_REQUEST:400,
    NOT_FOUND:404,
    SERVER_ERROR:500,
    UNAUTHORIZED:401,
    INTERNAL_SERVER_ERROR:600,

}
const succesResponse =(data, statusCode =200)=>{
    return{
        success:true,
        statusCode,
        data,
    };
}
const errorResponse =(data, statusCode =200)=>{
    return{
        success:true,
        statusCode,
        data,
    };
}
module.exports ={
    STATUS,
    succesResponse,
    errorResponse,
}