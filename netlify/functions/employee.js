const employees = [
  {
    "number": "+13392210809",
    "email" : "cathal@servisbot.com",
    "department" : "sales",
    "team" : "USsales",
    "name": "Cathal McGloin",
    "employeeId": "1234",
    "isManager": true,
    "location": "Boston",
    "isVIP" : true,
    "region":"NA",
    "country":"USA",
    "token" : "1a",
    "key" : "ahdlfmFwcG9nZWUtaHItcHJvZHVjdGlvbnIVCxIIRW1wbG95ZWUYgICAgPj7ggoMogEGTWlKdXVx"
  },
  {
    "number": "+447771858764",
    "email" : "chris@servisbot.com",
    "department" : "client success",
    "team" : "EUdelivery",
    "name": "Chris Doyle",
    "employeeId": "2234",
    "isManager": true,
    "isVIP" : false,
    "location": "York",
    "region":"EMEA",
    "country":"UK",
    "token" : "1b",
    "key" : "ahdlfmFwcG9nZWUtaHItcHJvZHVjdGlvbnIVCxIIRW1wbG95ZWUYgICAgO3biwoMogEGTWlKdXVx"
  },
  {
    "number": "+447841288482",
    "email" : "declan.mcgloin@servisbot.com",
    "department" : "client success",
    "team" : "EUdelivery",
    "name": "Declan McGloin",
    "employeeId": "3234",
    "isManager": false,
    "isVIP" : false,
    "location": "Manchester",
    "region":"EMEA",
    "country":"UK",
    "token" : "1c",
    "key" : "ahdlfmFwcG9nZWUtaHItcHJvZHVjdGlvbnIVCxIIRW1wbG95ZWUYgICAwMiTnQoMogEGTWlKdXVx"
  },
  {
    "number": "+17811234567",
    "email" : "ben.bell@servisbot.com",
    "department" : "Product",
    "team" : "USProduct",
    "name": "Ben Bell",
    "employeeId": "3234",
    "isManager": false,
    "isVIP" : false,
    "location": "Providence",
    "region":"NA",
    "country":"US",
    "token" : "1d",
    "key" : "ahdlfmFwcG9nZWUtaHItcHJvZHVjdGlvbnIVCxIIRW1wbG95ZWUYgICAwOzggwoMogEGTWlKdXVx"
  }
];

const respond = (e)=>{
  if (!e){
    return {
      statusCode: 404,
      body: JSON.stringify({message : 'Employee not found'})
    };  
  }
  let emp = { ...e };
  delete emp.token;
  return {
    statusCode: 200,
    body: JSON.stringify(emp)
  };
};

exports.handler = async (ev, context) => {
  let { phone, email, token } = (ev.body && JSON.parse(ev.body));
  phone = phone || ev.queryStringParameters && ev.queryStringParameters.phone;
  email = email || ev.queryStringParameters && ev.queryStringParameters.email;
  token = token || ev.queryStringParameters && ev.queryStringParameters.token;
  
  if (token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'){
    token = '1a';
  }
  
  if (email){
    return respond(employees.find(e => e.email === email));
  }
  
  if (phone){
    return respond(employees.find(e => e.phone === phone));
  }
  
  if (token){
    return respond(employees.find(e => e.token === token));
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ message : `Employee not found` })
  };  
}
