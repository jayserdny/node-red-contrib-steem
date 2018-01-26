var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getOwnerHistoryNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let accountName = param.accountName
            
            steem.api.getOwnerHistory(accountName, (err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getOwnerHistory", getOwnerHistoryNode);
}