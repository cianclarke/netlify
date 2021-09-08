const fetch = require('node-fetch')

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
        text : `New missed input: ${userInput}`,
        blocks : encodeURIComponent(JSON.stringify({
                    "type": "actions",
                    "block_id": "actions1",
                    "elements": [
                      {
                        "type": "static_select",
                        "placeholder":{
                            "type": "plain_text",
                            "text": "Which witch is the witchiest witch?"
                        },
                        "action_id": "select_2",
                        "options": [
                          {
                            "text": {
                                "type": "plain_text",
                                "text": "Matilda"
                            },
                            "value": "matilda"
                          },
                          {
                            "text": {
                                "type": "plain_text",
                                "text": "Glinda"
                            },
                            "value": "glinda"
                          },
                          {
                            "text": {
                                "type": "plain_text",
                                "text": "Granny Weatherwax"
                            },
                            "value": "grannyWeatherwax"
                          },
                          {
                            "text": {
                                "type": "plain_text",
                                "text": "Hermione"
                            },
                            "value": "hermione"
                          }
                        ]
                      },
                      {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Cancel"
                        },
                        "value": "cancel",
                        "action_id": "button_1"
                      }
                    ]
                  }));

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
}
