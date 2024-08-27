const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cookieParser());
app.use(express.json());
// app.use(
// 	cors({
// 		origin: [
// 			"http://localhost:3000",
// 		],
// 		credentials: true,
// 	})
// );


mongoose.connect(process.env.CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (e) => {
	console.log(e ? e : "Connected successfully to database");
});

app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

const path = require('path');
__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
	app.use(express.static(path.join(__dirname, '/client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	})
}

app.listen(port, () =>
	console.log(`Server running ${port}`)
);