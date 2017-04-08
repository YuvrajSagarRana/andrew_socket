var expect=require('expect');
var {generateMessage}=require('./message')
describe('generateMessage',()=>{
    it('should generate correct generation',()=>{
   var from='gen';
   var text='some message';
   var message=generateMessage(from ,text);
    expect(message.createdAt).toBeA('number');
   expect(message).toInclude({from,text});
});
})