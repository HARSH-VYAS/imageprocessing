"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const errorhandler_1 = __importDefault(require("../../helper/errorhandler"));
const routes = express_1.default.Router();
routes.get('/', errorhandler_1.default, (req, resp) => {
    const fileName = req.query.fileName;
    const width = Number(req.params.width);
    const height = Number(req.params.height);
    const existingPath = path_1.default.join(app_root_path_1.default.path, 'src/assets/full/', `${fileName}.jpg`);
    const newFilePath = path_1.default.join(app_root_path_1.default.path, 'src/assets/thumb/', `${fileName}_${width}_${height}.jpg`);
    transform(existingPath, width, height, newFilePath)
        .then(() => {
        checkFileExists(newFilePath)
            .then(() => resp.status(200).sendFile(newFilePath, (err) => {
            if (err)
                throw err;
        }))
            .catch((error) => {
            throw new Error("Process timed out while checking the file exists" + error);
        });
    }).catch((error) => {
        throw new Error("There was some problem processing the file" + error);
    });
});
function transform(fullPath, width, height, thumbpath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            (0, sharp_1.default)(fullPath)
                .resize(width, height)
                .toFile(thumbpath)
                .catch((error) => {
                throw new Error("Input file is missing inside sharp" + error);
            });
            resolve();
        });
    });
}
function checkFileExists(filePath) {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (fs_1.default.existsSync(filePath)) {
                console.log("New file is created");
                clearInterval(intervalId);
                resolve();
            }
        }, 1000);
    });
}
exports.default = routes;
