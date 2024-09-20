"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./api/routes"));
const app = (0, express_1.default)();
const port = 3000;
const full_path = path_1.default.join(__dirname, 'assets/full');
const thumb_path = path_1.default.join(__dirname, 'assets/thumb');
app.use(express_1.default.static(thumb_path));
app.use('/image', routes_1.default);
// Here we will post the output of the file.
app.listen(port, () => {
    console.log(`Server started at localhost :${port}`);
});
exports.default = app;
