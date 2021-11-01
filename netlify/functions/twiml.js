

exports.handler = async (event, context) => {
  let body;
  try{
    const twilioBody = new URLSearchParams(event.body);
  }catch(err){
    console.log(event.body);
    console.log('URL param body error');
    console.log(err);
  }
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
  // <Say voice="alice">Elevator Emergency: This is an automated message from TKE. We monitor your elevators at ${buildingName}. Someone has pushed the emergency call button in elevator number ${elevatorNumber} but there is no response or indication of a problem. Could you please have someone check the elevator to make sure no one is trapped or injured inside? If you need further assistance please call us back at ${branchCallback}.</Say>
  return {
    statusCode: 200,
    headers : {
      'content-type' : 'application/xml'
    },
    body: `
<Response>
  
  <Gather input="speech dtmf" timeout="3" numDigits="1">
      <Say>Please press 1 or say yes to acknowledge. Press 2 to pass this message to the next contact.</Say>
  </Gather>
</Response>
`
  }
}
