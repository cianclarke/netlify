const ONE_DAY = 24*60*60;
const customers = {
  '+17812668111' : {
    "number" : "(781) 266-8111",
    "name" : "Cian Clarke",
    "pin" : "1234",
    "paymentDate" : Date.now(),
    "paymentDateHuman" : "March 30th",
    "isVIP" : false,
    "phoneType" : "Apple iPhone 11 64gb Black",
    "balance" : "$120.00",
  },
  '+13392210809' : {
    "number" : "(339) 221-0809",
    "name" : "Cathal McGloin",
    "pin" : "1234",
    "paymentDate" : Date.now() + ONE_DAY,
    "paymentDateHuman" : "March 30th",
    "isVIP" : true,
    "phoneType" : "Apple iPhone XR 128gb Black",
    "balance" : "$15.00",
  },
  '+15087404492' : {
    "number" : "(508) 740-4492",
    "name" : "Ty Rollin",
    "pin" : "1234",
    "paymentDate" : Date.now() + ONE_DAY + ONE_DAY,
    "paymentDateHuman" : "March 30th",
    "isVIP" : false,
    "phoneType" : "Apple iPhone 8 128gb Gold",
    "balance" : "$100.00",
  },
  '+19518338760' : {
    "number" : "(951) 833-8760",
    "name" : "Ben Bell",
    "pin" : "1234",
    "paymentDate" : Date.now() - ONE_DAY,
    "paymentDateHuman" : "March 30th",
    "isVIP" : false,
    "phoneType" : "Samsung Galaxy S9 64gb Black",
    "balance" : "$240.00",
  }
};

exports.handler = async (ev, context) => {
  let { phone } = (ev.body && JSON.parse(ev.body));
  phone = phone || ev.queryStringParameters && ev.queryStringParameters.phone;
  if (!phone){
    return {
      statusCode: 400,
      body: JSON.stringify({ message : "Phone number is a required param" })
    };  
  };
  const customer = customers[phone];
  if (!customer){
    return {
      statusCode: 404,
      body: JSON.stringify({ message : `Phone number ${phone} not found` })
    };  
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(customer)
  };
}
