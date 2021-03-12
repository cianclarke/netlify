const fetch = require('node-fetch')

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts'

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const { challenge, event } = body;
  if (!event && challenge){
    return {
      statusCode: 200
      body: JSON.stringify({
        challenge
      })
    };
  };
  
  let response
  try {
    response = await fetch(API_ENDPOINT)
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
  const fact = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: fact
    })
  }
}
