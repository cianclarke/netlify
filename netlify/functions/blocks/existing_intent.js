module.exports = function(intents){
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Pick an intent to add this missed input to"
      },
      "accessory": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select an intent",
          "emoji": true
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "order_food",
              "emoji": true
            },
            "value": "order_food"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "book_taxi",
              "emoji": true
            },
            "value": "book_taxi"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "contact_concierge",
              "emoji": true
            },
            "value": "contact_concierge"
          }
        ],
        "action_id": "static_select-action"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Add to intent",
            "emoji": true
          },
          "value": "do_add",
          "action_id": "actionId-0"
        }
      ]
    }
  ];
}
