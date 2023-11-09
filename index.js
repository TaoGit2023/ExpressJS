const express = require("express");
const app = express();
const weatherRouter = require('./weatherRouter')
app.use(express.json());
app.use('/api',weatherRouter);
const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
