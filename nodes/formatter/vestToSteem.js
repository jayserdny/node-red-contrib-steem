var steem = require('steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function vestToSteemNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.vestingShares, param.totalVestingShares, param.totalVestingFundSteem);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }

            let vestingShares = parseInt(param.vestingShares.trim());
            let totalVestingShares = parseInt(param.totalVestingShares.trim());
            let totalVestingFundSteem = parseInt(param.totalVestingFundSteem.trim());

            var steemPower = steem.formatter.vestToSteem(vestingShares, totalVestingShares, totalVestingFundSteem);
            msg.payload = steemPower;
            node.send(msg);
        });
    }
    RED.nodes.registerType("vestToSteem", vestToSteemNode);
  }