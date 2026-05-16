const express = require('express');
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => 
    console.log("Connected to MongoDB"));

const urlRoute = require("./routes/url");

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const url = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!url) {
        return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(url.redirectURL);
});

app.listen(port,() => console.log(`Server is running on port ${port}`));