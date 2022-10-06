const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middlewares/errorsHandlers");
const passportJWT = require("./middlewares/passportJWT")();

const rateLimit = require("express-rate-limit");

// / All Routes

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const followRoute = require("./routes/follow");
const port = 3000;

const connectDB = require("./databse/db");
connectDB;

app.use(cors());

// / Set rate limit from express

app.enable("Trust Proxy");

const limiter = rateLimit({ windowMS: 15 * 1000, max: 10 });
app.use(limiter);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

app.use("/", authRoutes);
app.use("/", passportJWT.authenticate(), postRoutes);
app.use("/", passportJWT.authenticate(), followRoute);

app.use(errorHandler);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
