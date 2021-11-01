exports.handler = async (event, context) => {
  console.log('event');
  console.log(event);
  console.log('context');
  console.log(context);
  return {
    statusCode: 200,
    headers : {
      'content-type' : 'application/xml'
    }
    body: `
<Response>
  <Say voice="alice">Thanks for trying our documentation. Enjoy!</Say>
  <Play>http://demo.twilio.com/docs/classic.mp3</Play>
</Response>
`
  )
  }
}
