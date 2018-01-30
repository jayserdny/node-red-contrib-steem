var steem = require('steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function validateAccountNameNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.accountName);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }

            let accountName = param.accountName.trim();

            var isValidUsername = steem.utils.validateAccountName(accountName);
            msg.payload = isValidUsername;
            node.send(msg);
        });
    }
    RED.nodes.registerType("validateAccountName", validateAccountNameNode);
  }