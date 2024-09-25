import app from '../index';
import supertest from 'supertest';
import RootPath from 'app-root-path';

const request = supertest(app);

describe('Check Invalid Parameters width', () => {

    it('Check Not a number width', async () => {
       expect(async ()=>{
        const resp = await request.get('/image')
            .query({ fileName: 'fjord', width: "h", height: 300 })
            .expect(500);
            expect(()=>{throw resp.error}).toThrowError("cannot GET /image?fileName=fjord&width=h&height=300 (500)");
            expect(resp.text).toContain("Error: Width is not a number");

        }).not.toThrowError();
    });

    it('Check no width parameter', async () => {
      expect( async ()=>{
        const resp = await request.get('/image')
            .query({ fileName: 'fjord', height: '200' })
            .expect(500);
            
            expect(()=>{throw resp.error}).toThrowError("cannot GET /image?fileName=fjord&height=200 (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for width request parameter");
            setTimeout(()=>{},1000);
       }).not.toThrowError();
            
    });

    it('Check Empty width parameter', async () => {
        expect( async ()=>{
        const resp = await request.get('/image')
            .query({ fileName: 'fjord', width:'', height: '200' })
            .expect(500);
           
            expect(()=>{throw resp.error}).toThrowError("cannot GET /image?fileName=fjord&width=&height=200 (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for width request parameter");
        }).not.toThrowError();
                        
    });
});
