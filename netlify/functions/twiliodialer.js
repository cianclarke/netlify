// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

exports.handler = async (event, context) => {
  console.log('------twiliodialer.js------');
  const servisbotEvent = JSON.parse(event.body);
  console.log(servisbotEvent);
  let { CustomerReference, HostNotification } = servisbotEvent;
  HostNotification = JSON.parse(HostNotification);
  console.log(HostNotification);
  const {
    location,
    branchCallback,
    elevatorNumber,
    phone // differs from CustomerReference, which is the elevator phone number
  } = HostNotification;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  //let url = encodeURI(`https://cianclarke.eu.ngrok.io/.netlify/functions/twiml?CustomerReference=${CustomerReference}&elevatorNumber=${elevatorNumber}&location=${location}&branchCallback=${branchCallback}`);
  let url = encodeURI(`https://wonderful-euler-636c85.netlify.app/.netlify/functions/twiml?CustomerReference=${CustomerReference}&elevatorNumber=${elevatorNumber}&location=${location}&branchCallback=${branchCallback}`);
  url = url.replace(/\+/g, '%2B');
  console.log('url');
  console.log(url);

  // conversation start
  await client.calls
    .create({
      machineDetection: 'Enable',
      url,
      //statusCallback: 'https://cianclarke.eu.ngrok.io/.netlify/functions/twiliocallback',
      statusCallback: 'https://wonderful-euler-636c85.netlify.app/.netlify/functions/twiliocallback',
      statusCallbackEvent: ['completed'],
      // url: 'https://wonderful-euler-636c85.netlify.app/.netlify/functions/twiml',
      to: phone, // event.queryStringParameters.to,
      from: process.env.TWILIO_NUMBER
    })
    .then(call => console.log(call.sid))
    .catch(err => console.log(err));
  return {
    statusCode: 200,
    body: JSON.stringify({
      event, context
    })
  };
};
