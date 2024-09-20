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
const app_root_path_1 = __importDefault(require("app-root-path"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test images url endpoint', () => {
    it('Get 200 status ok from the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request.get('/image')
            .query({ fileName: 'fjord', width: 200, height: 300 })
            .expect(200);
    }));
    it('Check file does not exist error', () => __awaiter(void 0, void 0, void 0, function* () {
        let fullPath = app_root_path_1.default.path + "/src/assets/full/abc.jpg";
        const resp = yield request.get('/image')
            .query({ fileName: 'abc', width: 200, height: 300 })
            .expect(500)
            .expect((err) => {
            expect(err.text).toContain("Error: File path does not exist" + fullPath);
        });
    }));
});
describe('Check Invalid Parameters width', () => {
    it('Check Invalid Parameters width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image')
            .query({ fileName: 'fjord', width: "h", height: 300 })
            .expect(500)
            .expect((response) => {
            if (response) {
                expect(response.text).toContain("Error: Width is not a numbe");
            }
        });
    }));
    it('Check no width provided', () => __awaiter(void 0, void 0, void 0, function* () {
        let fullPath = app_root_path_1.default.path + "/src/assets/full/abc.jpg";
        const resp = yield request.get('/image')
            .query({ fileName: 'fjord', height: '200' })
            .expect(500)
            .expect((err) => {
            expect(err.text).toContain("Error: Please provide a valid positve number for width request parameter");
        });
    }));
});
describe('Check Invalid Parameters height', () => {
    it('Check Invalid Parameters height', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request.get('/image')
            .query({ fileName: 'fjord', width: "200", height: "h" })
            .expect(500)
            .expect((err) => {
            expect(err.text).toContain("Error: Height is not a numbe");
        });
    }));
    it('Check no width provided', () => __awaiter(void 0, void 0, void 0, function* () {
        let fullPath = app_root_path_1.default.path + "/src/assets/full/abc.jpg";
        const resp = yield request.get('/image')
            .query({ fileName: 'fjord', height: '200' })
            .expect(500)
            .expect((err) => {
            expect(err.text).toContain("Error: Please provide a valid positve number for width request parameter");
        });
    }));
});
