var steem = require('../steem');

module.exports = (RED) => {
    "use strict";
    function getChainIdNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            var chainId = steem.config.get('chain_id');

            if (chainId) {
                msg.payload = chainId;
            }
            else {
                msg.payload = null;
            }

            node.send(msg);
        });
    }
    RED.nodes.registerType("getChainId", getChainIdNode);
  }