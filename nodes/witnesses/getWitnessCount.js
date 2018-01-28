var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getWitnessCountNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            
            steem.api.getWitnessCount((err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getWitnessCount", getWitnessCountNode);
}