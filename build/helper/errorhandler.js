"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const handleError = (req, resp, next) => {
    const fileName = req.query.fileName;
    const width = getWidth(req.query.width);
    const height = getHeight(req.query.height);
    const existingPath = path_1.default.join(__dirname, '../../assets/full/', `${fileName}.jpg`);
    if ((0, lodash_1.isEmpty)(fileName)) {
        throw new Error("FileName can not be empty");
    }
    if (!fs_1.default.existsSync(existingPath)) {
        throw new Error("File path does not exist" + existingPath);
    }
    req.params.width = String(width);
    req.params.height = String(height);
    next();
};
function getWidth(width) {
    if ((0, lodash_1.isEmpty)(width))
        throw new Error("Please provide a valid positve number for width request parameter");
    if (isNaN(Number(width)))
        throw new Error("Width is not a number");
    const num = Number(width);
    if (num < 0)
        throw new Error("Width must be a posive number");
    if (num == 0)
        throw new Error("Width can not be 0 ");
    return num;
}
function getHeight(height) {
    if ((0, lodash_1.isEmpty)(height))
        throw new Error("Please provide a valid positve number for Height request parameter");
    if (isNaN(Number(height)))
        throw new Error("Height is not a number");
    const num = Number(height);
    if (num < 0)
        throw new Error("Height must be a posive number");
    if (num == 0)
        throw new Error("Height can not be 0 ");
    return num;
}
exports.default = handleError;
