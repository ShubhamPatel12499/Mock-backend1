const jwt= require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.Authorization
    if(token){
        const decoded=jwt.verify(token,'shubham123')
        if(decoded)
        {
            const userID=decoded.userID
            console.log(decoded)
            req.body.userID=userID
            next()
        }

        else
        {
            res.send("Please Login first!")
        }
    }

    else
    {
        res.send("Please Login first!")
    }
}

module.exports={
    authenticate
}