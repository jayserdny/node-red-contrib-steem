var steem = require('../steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function setChainIdNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.chainId);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }
            
            steem.config.set('chain_id', param.chainId);
            msg.payload = 'Chain Id set to ' + param.chainId;

            node.send(msg);
        });
    }
    RED.nodes.registerType("setChainId", setChainIdNode);
  }