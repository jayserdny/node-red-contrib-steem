var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getActiveWitnessesNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            
            steem.api.getActiveWitnesses((err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getActiveWitnesses", getActiveWitnessesNode);
}