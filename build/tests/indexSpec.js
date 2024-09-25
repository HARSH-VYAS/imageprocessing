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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_2 = require("../api/routes/index");
const request = (0, supertest_1.default)(index_1.default);
describe('Test images url endpoints', () => {
    it('Get 200 status ok from the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request.get('/image')
            .query({ fileName: 'fjord', width: 200, height: 300 })
            .expect(200);
    }));
    it('Check file does not exist error', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const fullPath = path_1.default.join(__dirname, '../../assets/full/abc.jpg');
            const resp = yield request.get('/image')
                .query({ fileName: 'abc', width: 200, height: 300 })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=abc&width=200&height=300 (500)");
            expect(resp.text).toContain("Error: File path does not exist" + fullPath);
        })).not.toThrowError();
    }));
    it('Check If no file name is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield request.get('/image')
                .query({ fileName: '', width: 200, height: 300 });
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=&width=200&height=300 (500)");
            expect(resp.text).toContain("Error: FileName can not be empty");
        })).not.toThrowError();
    }));
    it('Check transform function file exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const fullPath = path_1.default.join(__dirname, '../../assets/full/fjord.jpg');
        const thumbPath = path_1.default.join(__dirname, '../../assets/thumb/fjord_200_300.jpg');
        yield (0, index_2.transform)(fullPath, 200, 300, thumbPath);
        const exists = fs_1.default.existsSync(thumbPath);
        expect(exists).toBeTrue();
    }));
    it('Check transform function if fullPath file does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const fullPath = path_1.default.join(__dirname, '../../assets/full/abc.jpg');
        const thumbPath = path_1.default.join(__dirname, '../../assets/thumb/abc_200_300.jpg');
        (0, index_2.transform)(fullPath, 200, 300, thumbPath)
            .catch((reject) => {
            expect(reject).toContain("Error: Input file is missing ");
        });
    }));
});
