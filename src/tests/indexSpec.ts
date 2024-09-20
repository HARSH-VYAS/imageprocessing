import app from '../index';
import supertest from 'supertest';
import bodyparser from 'body-parser';
import { response } from 'express';
import RootPath from 'app-root-path';
import { doesNotMatch } from 'assert';
import { error } from 'console';

const request = supertest(app);

describe('Test images url endpoint',()=>{

    it('Get 200 status ok from the endpoint',async ()=>{
        const resp = await request.get('/image')
        .query({fileName:'fjord', width:200, height:300})
        .expect(200);
        
    }); 

    it('Check file does not exist error',async ()=>
    {
    let fullPath:string = RootPath.path  + "/src/assets/full/abc.jpg"; 
        const resp = await request.get('/image')
        .query({fileName:'abc', width:200, height:300})
        .expect(500)
        .expect(
        (err)=>
        {
                expect(err.text).toContain("Error: File path does not exist"+fullPath);
        }
    );
    
});
});


describe('Check Invalid Parameters width',()=>{

    it('Check Invalid Parameters width',async ()=>
    {
       const response = await request.get('/image')
        .query({fileName:'fjord', width:"h", height:300})
        .expect(500)
        .expect((response:Response)=>{
            if(response)
            { 
                expect(response.text).toContain("Error: Width is not a numbe");
            
            }
        })

    });



it('Check no width provided',async ()=>
{
    let fullPath:string = RootPath.path  + "/src/assets/full/abc.jpg"; 
       const resp = await request.get('/image')
        .query({fileName:'fjord', height:'200'})
        .expect(500)
        .expect(
        
        (err)=>
        {
            expect(err.text).toContain("Error: Please provide a valid positve number for width request parameter");
        }
    );

    
});


});



describe('Check Invalid Parameters height',()=>{
    it('Check Invalid Parameters height',async ()=>
    {
        const resp = await request.get('/image')
        .query({fileName:'fjord', width:"200", height:"h"})
        .expect(500)
        .expect((err:Response)=>{
                expect(err.text).toContain("Error: Height is not a numbe");
            
        });
    });
    it('Check no width provided',async ()=>
    {
        let fullPath:string = RootPath.path  + "/src/assets/full/abc.jpg"; 
        const resp =    await request.get('/image')
            .query({fileName:'fjord', height:'200'})
            .expect(500)
            .expect(
            
            (err)=>
            {
                expect(err.text).toContain("Error: Please provide a valid positve number for width request parameter");
            }
        );
    
        
    });
    


});




