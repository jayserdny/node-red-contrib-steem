var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function createSuggestedPasswordNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            var password = steem.formatter.createSuggestedPassword();
            msg.payload = password;
            node.send(msg);
        });
    }
    RED.nodes.registerType("createSuggestedPassword", createSuggestedPasswordNode);
  }