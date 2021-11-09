const fetch = require('node-fetch');
// Takes prompts from Twilio and tells it what to say

exports.handler = async (event, context) => {
  console.log('------twiml.js------');
  let body = {};
  try {
    body = new URLSearchParams(event.body);
  } catch (err) {
    console.log(event.body);
    console.log('URL param body error');
    console.log(err);
  }
  console.log('body, msg, digits, eval');
  const msg = body.get('msg');
  const Digits = body.get('Digits');
  const Called = body.get('Called');
  console.log(msg);
  console.log(Digits);
  console.log(Called);
  console.log('event.queryStringParameters');
  console.log(event.queryStringParameters);
  const {
    location,
    branchCallback,
    elevatorNumber
  } = event.queryStringParameters;
  //
  // welcome
  let response = `
<Response>
  <Say voice="alice">Elevator Emergency: This is an automated message from TKE. We monitor your elevators at ${location}. Someone has pushed the emergency call button in elevator number ${elevatorNumber} but there is no response or indication of a problem. Could you please have someone check the elevator to make sure no one is trapped or injured inside? If you need further assistance please call us back at ${branchCallback}.</Say>
  <Gather input="dtmf" timeout="3" numDigits="1">
  
      <Say>Please press 1 to acknowledge. Press 2 to pass this message to the next contact.</Say>
  </Gather>
</Response>
`;


  if (msg && msg === 'Gather End') {
    // if user says 1
    if (Digits === '1') {
      response = `
  <Response>  
    <Say>Ok - you've acknowledged that you will check the elevator.</Say>
    <Hangup/>
  </Response>
  `;
    }
    // if user says 2
    if (Digits === '2') {
      response = `
  <Response>
    <Say>Ok - we'll call another emergency contact.</Say>
    <Hangup/>
  </Response>
  `;
    }
    await sendToServisbot(Called, Digits);
  }


  console.log('Sending:');
  console.log(response);


  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/xml'
    },
    body: response
  };
};


async function sendToServisbot(Called, utterance) {
  const sbotResult = await fetch('https://engagement.eu-1.servisbot.com/picard/v1/engage/cians-tke-webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SBOT_KEY}`
    },
    body: JSON.stringify({

      Type: 'message',
      Value: utterance,
      CustomerReference: Called
    })
  });
  console.log(`Sent to servisbot ${Called} : ${utterance}`);
  console.log(sbotResult);
}
