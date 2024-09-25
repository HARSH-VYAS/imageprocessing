import app from '../index';
import supertest from 'supertest';
import RootPath from 'app-root-path';

const request = supertest(app);

describe('Check Invalid Parameters height', () => {

    it('Check not a number height parameter', async () => {
       expect(async () => {
        
        const resp = await request.get('/image')
            .query({ fileName: 'fjord', width: "200", height: "h" })
            .expect(500);
            expect(()=>{throw resp.error}).toThrowError("cannot GET /image?fileName=fjord&width=200&height=h (500)");
            expect(resp.text).toContain("Error: Height is not a number");
        }).not.toThrowError();
    });
    
    it('Check no height parameter provided', async () => {
        expect(async() => {
        
        const resp = await request.get('/image')
            .query({ fileName: 'fjord', width: '200' })
            .expect(500);
            expect(()=>{throw resp.error}).toThrowError("cannot GET /image?fileName=fjord&width=200 (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for Height request parameter");
            
        }).not.toThrowError();
    });

    it('Check empty height parameter provided', async () => {
       expect(async () => {
        
       const resp = await request.get('/image')
            .query({ fileName: 'fjord', width: '200', 'height':'' })
            .expect(500)
           
            expect(()=>{throw resp.error}).toThrowError("cannot GET /image?fileName=fjord&width=200&height= (500)");
            expect(resp.text).toContain("Error: Please provide a valid positve number for Height request parameter");
                
            }).not.toThrowError();
    });
});