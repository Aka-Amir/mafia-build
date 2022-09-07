const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

app.use(express.static(__dirname + '/public'));

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/*", (req, res) => {
  res.redirect('/');
});

router.post("/*", (req, res) => {
    res.status(400).send();
});

router.put("/*", (req, res) => {
    res.status(400).send();
});

router.delete("/*", (req, res) => {
    res.status(400).send();
});
app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");