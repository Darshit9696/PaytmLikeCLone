require("dotenv").config();
const express = require("express");
const { authMiddleware } = require("../backend/routes/Auth"); 

const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Step 2 : create a general route like /api/v1
// “Every route inside this router will start with /api/v1.”
app.use("/api/v1",mainRouter);


app.listen(5000, () => {
    console.log(`Server running on port ${5000}`);
});


