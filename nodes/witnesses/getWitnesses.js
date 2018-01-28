var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getWitnessesNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let witnessIds;
            try {
                witnessIds = param.witnessIds.split(',').map(user => user.trim());;
            } catch (e) {
                witnessIds = param.witnessIds
            }
            
            steem.api.getWitnesses(witnessIds, (err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getWitnesses", getWitnessesNode);
}