const fetch = require('node-fetch')
const blocks =   [
  {
    "type": "section",
    "text": {
      "type": "plain_text",
      "text": "New missed input:",
      "emoji": true
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "_Eschew esoteric obfuscation_"
      }
    ]
  },
  {
    "type": "actions",
    "elements": [
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Add to existing intent"
        },
        "style": "primary",
        "value": "click_me_123"
      },
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Create new intent"
        },
        "value": "click_me_123"
      },
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Reject"
        },
        "value": "click_me_123"
      }
    ]
  }
];



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
  const { userInput } = body;
  if (!userInput){
    return {
      statusCode: 400,
      body: JSON.stringify({
        message : "No user input found"
      })
    };
  };
  
  try {
    response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${process.env.SLACK_KEY}`
      },
      body: JSON.stringify({
        channel : 'ciansbottest',
        //text : `New missed input: ${userInput}`,
        blocks
      })
    });
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
}

// const ev = {
//   body : JSON.stringify({
//     userInput : 'Escew esoteric obfuscation'
//   })
// }
// const context = {};
// exports.handler(ev, context);
