const fetch = require('node-fetch')

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts'

exports.handler = async (ev, context) => {
  const { Messages, CustomerReference, Markdown } = ev;
  console.log(ev);
  let messages;
  if (Markdown){
    messages = Markdown.map(msg => {
      return msg.message || msg.url;
    });
  }
  messages = Messages;
  
  if (messages){
    messages.map(async msg => {
      let response
      try {
        response = await fetch('https://slack.com/api/chat.postMessage', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${process.env.SLACK_KEY}`
          },
          body: JSON.stringify({
            channel : CustomerReference,
            text : msg
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
    });  
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({})
  };
  // 

  
  
  
  
  
  
}
