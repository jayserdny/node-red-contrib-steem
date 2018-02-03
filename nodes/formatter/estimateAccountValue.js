var steem = require('../steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function estimateAccountValueNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.account);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }

            let account = param.account.trim();

            var steemPower = steem.formatter.estimateAccountValue(account);
            msg.payload = steemPower;
            node.send(msg);
        });
    }
    RED.nodes.registerType("estimateAccountValue", estimateAccountValueNode);
  }