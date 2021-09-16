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
  
  console.log(ev.body);
  if (ev.body.startsWith('payload=')){
    
    ev.body = ev.body.replace('payload=', '');
    ev.body = decodeURIComponent(ev.body);
  }
  body = JSON.parse(ev.body);
  const { challenge, event, type, actions } = body;
  if (!event && challenge){
    return {
      statusCode: 200,
      body: JSON.stringify({
        challenge
      })
    };
  };
  
  if (type === 'block_actions'){
    console.log('value');
    console.log(actions[0].value);
    return {
      statusCode: 200,
      body: JSON.stringify({})
    };
  }
  
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
