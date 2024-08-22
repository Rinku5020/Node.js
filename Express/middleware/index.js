const express = require("express")
const app = express()
app.get("/", (req, res) => {
    console.log("home");
    res.send("home page")

})

app.listen(8080, () => {
    console.log("Running on port 8080");
});
