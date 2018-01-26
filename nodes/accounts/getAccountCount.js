var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getAccountCountNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        
        node.on('input', (msg) => {
            
            steem.api.getAccountCount((err, response) => {
                msg.payload = response
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("getAccountCount", getAccountCountNode);
  }