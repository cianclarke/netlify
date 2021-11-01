// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

exports.handler = async (event, context) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  // conversation start
  client.calls
        .create({
           machineDetection: 'Enable',
           url: 'https://wonderful-euler-636c85.netlify.app/.netlify/functions/twiml',
           to: event.queryStringParameters.to,
           from: process.env.TWILIO_NUMBER
         })
        .then(call => console.log(call.sid))
        .catch(err => console.log(err));
  console.log('event');
  console.log(event);
  console.log('context');
  console.log(context);
  return {
    statusCode: 200,
    body: JSON.stringify({
      event, context
    })
  }
}
