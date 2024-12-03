const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToDatabase } = require("./db");
const doctorRoute = require("./src/routes/doctorRoute");


const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

(async () => {
    const db = await connectToDatabase();
    const doctorCollection = db.collection("doctors");


    app.use("/api/v1", doctorRoute(doctorCollection));
    


    app.get('/',async (req,res)=>{
        res.send('Welcome to the Hospital Management API');
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})();