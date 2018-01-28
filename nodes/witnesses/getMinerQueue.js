var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getMinerQueueNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            
            steem.api.getMinerQueue((err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getMinerQueue", getMinerQueueNode);
}