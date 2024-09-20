"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const lodash_1 = require("lodash");
const routes = express_1.default.Router();
const full_path = 'src/assets/full/';
const thumb_path = 'src/assets/thumb/';
routes.get('/', (req, resp) => {
    let rootPath = app_root_path_1.default.path;
    try {
        let fileName = req.query.fileName;
        let fullPath = (path_1.default.join(rootPath, full_path, `${fileName}.jpg`));
        if (!fs_1.default.existsSync(fullPath)) {
            throw new Error("File path does not exist" + fullPath);
        }
        let width = getWidth(req.query.width);
        let height = getHeight(req.query.height);
        const newFilePath = path_1.default.join(rootPath, thumb_path, `${fileName}_${width}_${height}.jpg`);
        (0, sharp_1.default)(path_1.default.join(rootPath, full_path, `${fileName}.jpg`))
            .resize(width, height)
            .toFile(newFilePath, (error) => {
            if (error)
                throw error;
        });
        checkFileExists(newFilePath)
            .then(() => resp.status(200).sendFile(newFilePath, (err) => {
            if (err)
                throw err;
        }));
    }
    catch (error) {
        throw error;
    }
});
function checkFileExists(filePath) {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (fs_1.default.existsSync(filePath)) {
                console.log("Now file is created");
                clearInterval(intervalId);
                resolve();
            }
        }, 1000);
    });
}
function getWidth(width) {
    try {
        if ((0, lodash_1.isEmpty)(width))
            throw new Error("Please provide a valid positve number for width request parameter");
        if (isNaN(Number(width)))
            throw new Error("Width is not a number");
        return Number(width);
    }
    catch (err) {
        throw err;
    }
}
function getHeight(height) {
    try {
        if ((0, lodash_1.isEmpty)(height))
            throw new Error("Please provide a valid positve number for Height request parameter");
        if (isNaN(Number(height)))
            throw new Error("Height is not a number");
        return Number(height);
    }
    catch (err) {
        throw err;
    }
}
exports.default = routes;
