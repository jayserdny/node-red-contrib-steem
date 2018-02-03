var steem = require('../steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function setOptionsNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.url);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }
            
            steem.api.setOptions({ url: param.url });
            msg.payload = 'URL set to ' + param.url;

            node.send(msg);
        });
    }
    RED.nodes.registerType("setOptions", setOptionsNode);
  }