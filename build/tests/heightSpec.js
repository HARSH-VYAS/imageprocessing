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
describe('Check Invalid Parameters height', () => {
    it('Check not a number height parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield request.get('/image')
                .query({ fileName: 'fjord', width: "200", height: "h" })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=fjord&width=200&height=h (500)");
            expect(resp.text).toContain("Error: Height is not a number");
        })).not.toThrowError();
    }));
    it('Check no height parameter provided', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield request.get('/image')
                .query({ fileName: 'fjord', width: '200' })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=fjord&width=200 (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for Height request parameter");
        })).not.toThrowError();
    }));
    it('Check empty height parameter provided', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield request.get('/image')
                .query({ fileName: 'fjord', width: '200', 'height': '' })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=fjord&width=200&height= (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for Height request parameter");
        })).not.toThrowError();
    }));
});
