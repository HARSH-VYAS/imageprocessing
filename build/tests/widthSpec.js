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
const request = (0, supertest_1.default)(index_1.default);
describe('Check Invalid Parameters width', () => {
    it('Check Not a number width', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield request.get('/image')
                .query({ fileName: 'fjord', width: "h", height: 300 })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=fjord&width=h&height=300 (500)");
            expect(resp.text).toContain("Error: Width is not a number");
        })).not.toThrowError();
    }));
    it('Check no width parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield request.get('/image')
                .query({ fileName: 'fjord', height: '200' })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=fjord&height=200 (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for width request parameter");
            setTimeout(() => { }, 1000);
        })).not.toThrowError();
    }));
    it('Check Empty width parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield request.get('/image')
                .query({ fileName: 'fjord', width: '', height: '200' })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=fjord&width=&height=200 (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for width request parameter");
        })).not.toThrowError();
    }));
});
