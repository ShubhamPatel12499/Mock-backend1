const express = require("express")
const {connection}= require("./config/db")
const {userRouter} = require("./routes/User.routes")
const {flightRouter} = require("./routes/Flight.routes")
const {authenticate} = require("./middlewares/authenticate.middleware")

const app = express()
// app.use(cors({
//     origin:"*"
// }))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/users",userRouter)

app.use("/flights",flightRouter)
app.use(authenticate)

app.listen(8080, async()=>{
    try{
        await connection
        console.log("connected to the DB")
     }
     catch(err){
        console.log("Something went wrong")
        console.log(err);
     }
     console.log("Server is running on 8080 port")
})