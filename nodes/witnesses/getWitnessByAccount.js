var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getWitnessByAccountNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let accountName = param.accountName.trim();
            
            steem.api.getWitnessByAccount(accountName, (err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getWitnessByAccount", getWitnessByAccountNode);
}