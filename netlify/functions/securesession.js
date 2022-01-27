let expired = false;
let timeout;
if (!timeout || !expired){
  timeout = setTimeout(function(){
    expired = true;
  }, 20000);  
}

exports.handler = async (event, context) => {
  const tokens = ['1a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '1b', '1c', '1d'];
  const token = event.body.token || event.queryStringParameters.token;
  console.log('event');
  console.log(event);
  console.log('context');
  
  if (event.queryStringParameters.unexpire){
    expired = false;
    timeout = setTimeout(function(){
      expired = true;
    }, 20000);  
  }
  if (event.queryStringParameters.expire){
    expired = true;
  }
  console.log(context);
  if (tokens.includes(token) && !expired){
    return {
      statusCode: 200,
      body: JSON.stringify({ expired, token, ...event.body })
    }
  }
  
  return {
    statusCode: 401,
    body: JSON.stringify({
      event, context
    })
  }
}
