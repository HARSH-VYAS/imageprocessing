"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const routes = express_1.default.Router();
routes.get('/', (req, resp) => {
    let fileName = req.query.fileName;
    let width = Number(req.query.width);
    let height = Number(req.query.height);
    let filePath = `src/assets/full/${fileName}.jpg`;
    (0, sharp_1.default)(filePath)
        .resize(width, height)
        .toFile(`src/assets/processed/${fileName}.jpg`, (err, info) => {
        console.log('error is ' + err);
        console.log('info is ' + info);
    });
    resp.send("Image is processed");
});
/*
function parsePathFromUrl(url: string): string {
  const urlObject = new URL(url);
  return urlObject.pathname;
}

const url = "https://example.com/some/path/to/file.txt";
const path = parsePathFromUrl(url);

console.log(path); // Output: /some/path/to/file.txt
*/
exports.default = routes;
