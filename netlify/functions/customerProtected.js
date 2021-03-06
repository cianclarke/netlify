const customerLookup = require('./customer');
exports.handler = async (event, context) => {
  const tokens = ['1a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'];
  console.log('event');
  console.log(event);
  console.log('context');
  console.log(context);
  if (tokens.includes(event.body.token) || tokens.includes(event.queryStringParameters.token)){
    return customerLookup(event, context);
  }
  
  return {
    statusCode: 401,
    body: JSON.stringify({
      event, context
    })
  }
}
