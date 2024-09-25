"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./api/routes/index"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../assets/thumb')));
app.use('/image', index_1.default);
// Here we will post the output of the file.
app.listen(port, () => {
    console.log(`Server started at localhost :${port}`);
});
exports.default = app;
