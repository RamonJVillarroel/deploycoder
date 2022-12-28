const express = require('express');


const PORT = process.env.PORT || 8080;
const app = express();
app.get('/',(req,res)=>{
    res.send('<h1>hola esto es un deploy modificado </h1>')
}
);
app.listen(PORT, ()=>{
    console.log('PUERTO ACTIVO'+ PORT);
});