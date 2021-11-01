

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
  console.log(body);
  const { 
    buildingName, 
    branchCallback,
    elevatorNumber
  } = body;
  // <Say voice="alice">Elevator Emergency: This is an automated message from TKE. We monitor your elevators at ${buildingName}. Someone has pushed the emergency call button in elevator number ${elevatorNumber} but there is no response or indication of a problem. Could you please have someone check the elevator to make sure no one is trapped or injured inside? If you need further assistance please call us back at ${branchCallback}.</Say>
  
  let response = `
<Response>
  <Gather input="dtmf" timeout="3" numDigits="1">
      <Say>Please press 1 to acknowledge. Press 2 to pass this message to the next contact.</Say>
  </Gather>
</Response>
`;
  if (body.msg && body.msg === 'Gather End' && body.Digits === '1'){
    response = `
<Response>  
  <Say>Ok - you've acknowledged that you will check the elevator.</Say>
  <Hangup/>
</Response>
`;
  }
  if (body.msg && body.msg === 'Gather End' && body.Digits === '1'){
    response = `
<Response>
  <Say>Ok - we'll call another emergency contact.</Say>
  <Hangup/>
</Response>
`;
  }
  
  
  
  return {
    statusCode: 200,
    headers : {
      'content-type' : 'application/xml'
    },
    body: response
  }
}
