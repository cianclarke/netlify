const fetch = require('node-fetch')

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts'

exports.handler = async (ev, context) => {
  let body;
  if (!ev.body){
    console.log('No body')
    return {
      statusCode: 200,
      body: JSON.stringify(ev)
    };
  }
  
  body = JSON.parse(ev.body);
  const { challenge, event } = body;
  if (!event && challenge){
    return {
      statusCode: 200,
      body: JSON.stringify({
        challenge
      })
    };
  };
  
  const { channel, text } = event;
  console.log('Gots event:')
  console.log(event);
  
  let response
  try {
    response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token : 'xoxb-32731804422-1850092341107-eVGNIhlQzoNVFMr42JvbvwxN',
        channel,
        text
      })
    })
    // handle response
  } catch (err) {
    console.log('err')
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
  const slackresponse = await response.json();
  console.log('slack response')
  console.log(slackresponse);
  return {
    statusCode: 200,
    body: JSON.stringify({})
  };
  // 

  
  
  
  
  
  
}