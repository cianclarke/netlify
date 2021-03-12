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
  
  const { channel, text, user } = event;
  console.log('Gots event:')
  console.log(event);
  const utterance = text.replace(`<@${user}> `, '');
  
  const sbotResult = await fetch(`https://engagement.eu-1.servisbot.com/picard/v1/engage/cianclarke-CiansWebhook`, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${process.env.SBOT_KEY}`
    },
    body : JSON.stringify({
      "Type": "message", 
      "Value": utterance, 
      "CustomerReference": channel
    })
  });
  console.log('sbotResult')
  console.log(sbotResult);
  console.log(await sbotResult.json());
  return {
    statusCode: 200,
    body: JSON.stringify({})
  };
}
