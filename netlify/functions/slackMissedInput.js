const sendBlocks = require('./lib/sendBlocks');
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
        "value": "add_existing"
      },
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Create new intent"
        },
        "value": "add_new"
      },
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Ignore"
        },
        "value": "ignore",
        "style" : "danger"
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
  
  return sendBlocks('ciansbottest', blocks);
}
// 
// const ev = {
//   body : JSON.stringify({
//     userInput : 'Escew esoteric obfuscation'
//   })
// }
// const context = {};
// exports.handler(ev, context);
