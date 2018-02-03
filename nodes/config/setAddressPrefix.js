var steem = require('../steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function setAddressPrefixNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.addresPrefix);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }
            
            steem.config.set('address_prefix',param.addresPrefix);
            msg.payload = 'Address prefix set to ' + param.addresPrefix;

            node.send(msg);
        });
    }
    RED.nodes.registerType("setAddressPrefix", setAddressPrefixNode);
  }