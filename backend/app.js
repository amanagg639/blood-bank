const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Enable CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",  // Allow requests from your frontend
        credentials: true,  // Allow cookies to be sent from the frontend
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  // Allowed methods
        allowedHeaders: "Content-Type,Authorization",  // Allowed headers
    })
);

mongoose.connect(process.env.CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (e) => {
    console.log(e ? e : "Connected successfully to database");
});
app.get('/',(req, res)=>{
	res.send({
		activeStatus:true,
		error:false,
	})
})
// Routers
app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

const path = require('path');
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);
