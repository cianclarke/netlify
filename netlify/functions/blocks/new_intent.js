module.exports = function(intents){
  return [
    {
      "type": "input",
      "element": {
        "type": "plain_text_input",
        "action_id": "plain_text_input-action"
      },
      "label": {
        "type": "plain_text",
        "text": "Intent Name",
        "emoji": true
      }
    },
    {
      "type": "input",
      "element": {
        "type": "plain_text_input",
        "multiline": true,
        "action_id": "plain_text_input-action"
      },
      "label": {
        "type": "plain_text",
        "text": "Utterances",
        "emoji": true
      }
    },
    {
      "type": "input",
      "element": {
        "type": "plain_text_input",
        "action_id": "plain_text_input-action"
      },
      "label": {
        "type": "plain_text",
        "text": "Bot Response",
        "emoji": true
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Create",
            "emoji": true
          },
          "value": "do_create",
          "action_id": "actionId-0"
        }
      ]
    }
  ];
}
