const fetch = require('node-fetch');
// Takes prompts from Twilio and tells it what to say


exports.handler = async (event, context) => {
  console.log('------twiliocallback.js------');

  let body = {};
  try {
    body = new URLSearchParams(event.body);
  } catch (err) {
    console.log(event.body);
    console.log('URL param body error');
    console.log(err);
  }
  console.log(body);
  console.log(event.queryStringParameters);
  const Called = body.get('Called');
  // treat failed or declined as a `2`, i.e. pass to next.
  if (body.get('AnsweredBy') === 'machine_start') {
    await sendToServisbot(Called, '2');
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/xml'
    },
    body: ''
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
