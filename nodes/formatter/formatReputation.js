var steem = require('steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function formatReputationNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.reputation);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }

            let reputation = parseInt(param.reputation.trim());

            var reputationFinal = steem.formatter.reputation(reputation);
            msg.payload = reputationFinal;
            node.send(msg);
        });
    }
    RED.nodes.registerType("formatReputation", formatReputationNode);
  }