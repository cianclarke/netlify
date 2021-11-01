

exports.handler = async (event, context) => {
  let body = event.body && JSON.parse(event.body);
  body = body || {
    buildingName : 'unknown',
    branchCallback : 'unknown',
    elevatorNumber : 'unknown'
  };
  const { 
    buildingName, 
    branchCallback,
    elevatorNumber
  } = body;
  console.log('event');
  console.log(event);
  console.log('context');
  console.log(context);
  return {
    statusCode: 200,
    headers : {
      'content-type' : 'application/xml'
    },
    body: `
<Response>
  <Say voice="alice">Elevator Emergency: This is an automated message from TKE. We monitor your elevators at ${buildingName} Someone has pushed the emergency call button in elevator number ${elevatorNumber} but there is no response or indication of a problem. Could you please have someone check the elevator to make sure no one is trapped or injured inside? If you need further assistance please call us back at ${branchCallback}.</Say>
  <Gather input="speech dtmf" timeout="3" numDigits="1">
      <Say>Please press 1 or say yes to acknowledge. Press 2 to pass this message to the next contact.</Say>
  </Gather>
</Response>
`
  }
}
