exports.handler = async (event, context) => {
  console.log('event');
  console.log(event);
  console.log('context');
  console.log(context);
  return {
    statusCode: 200,
    body: JSON.stringify({
      event, context
    })
  }
}
