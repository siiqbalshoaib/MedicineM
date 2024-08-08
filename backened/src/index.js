import dotenv  from  "dotenv"
import connectDb from "./db/db.js";
import {app} from "./app.js";

dotenv.config({
    path:"./.env"
})


connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,  ()=>{
        console.log(`⚙️  Serveris running at port: ${process.env.PORT}`);
    })
})

.catch((err)=>{
    console.log("Mongodb connection failed !!!"  , err)
});