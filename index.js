import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

import express from "express";
import bodyParser from "body-parser";
import { basename, dirname } from "path";
import { fileURLToPath } from "url";


// var qr = require('qr-image');


var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
const __dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();
const port = 3000;
var urlName = "";
const url = "";
var qr_svg = "";




inquirer
    .prompt([
        { message: urlName, name: "URL" }
    ])
    .then((answers) => {
        // console.log(answers)
        url = answers.URL
        qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('qr1_img.png'));
        fs.writeFile('URL_1.txt', url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });


app.use(bodyParser.urlencoded({ extended: true }));

function qrGenerator(req, res, next) {
    console.log("Request body: ", req.body);
    urlName = req.body["adress"]
    next()
};

app.use(qrGenerator);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
    res.sendFile(__dirname + "/qr1_img.png");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/