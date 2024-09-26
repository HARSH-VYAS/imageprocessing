import app from '../index';
import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import { transform } from '../api/routes/index';
import sharp from 'sharp';

const request = supertest(app);

describe('Test images url endpoints', () => {

    it('Get 200 status ok from the endpoint', async () => {
        const resp = await request.get('/image')
            .query({ fileName: 'fjord', width: 200, height: 300 })
            .expect(200);
         // Check if response body is an image using Sharp
         const ibuffer = resp.body;
         const imetadata = await sharp(ibuffer).metadata();
         expect(imetadata.format).toBe('jpeg');
        
    });

    it('Check file does not exist error', async () => {
        expect(async () => {
            const fullPath: string = path.join(__dirname, '../../assets/full/abc.jpg');
            const resp = await request.get('/image')
                .query({ fileName: 'abc', width: 200, height: 300 })
                .expect(500);
            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=abc&width=200&height=300 (500)");
            expect(resp.text).toContain("Error: File path does not exist" + fullPath);
        }).not.toThrowError();

    });

    it('Check If no file name is provided', async () => {
        expect(async () => {
            const resp = await request.get('/image')
                .query({ fileName: '', width: 200, height: 300 });

            expect(() => { throw resp.error; }).toThrowError("cannot GET /image?fileName=&width=200&height=300 (500)");
            expect(resp.text).toContain("Error: FileName can not be empty");
        }).not.toThrowError();


    });

    it('Check transform function file exists', async () => {
        const fullPath: string = path.join(__dirname, '../../assets/full/fjord.jpg');
        const thumbPath = path.join(__dirname, '../../assets/thumb/fjord_200_300.jpg');
        await transform(fullPath, 200, 300, thumbPath);
        const exists = fs.existsSync(thumbPath);
        expect(exists).toBeTrue();
    });

    it('Check transform function if fullPath file does not exist', async () => {
        const fullPath: string = path.join(__dirname, '../../assets/full/abc.jpg');
        const thumbPath = path.join(__dirname, '../../assets/thumb/abc_200_300.jpg');
        transform(fullPath, 200, 300, thumbPath)
            .catch((reject) => {
                expect(reject).toContain("Error: Input file is missing:");
            });

    });
});





