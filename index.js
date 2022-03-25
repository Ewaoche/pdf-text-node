const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const dotenv = require('dotenv');

const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

//Load env var
dotenv.config({ path: './config/config.env' });


app.post("/extract-text", (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
});

app.listen(process.env.PORT);