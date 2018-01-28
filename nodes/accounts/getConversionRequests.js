var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getConversionRequestsNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let accountName = param.accountName
            
            steem.api.getConversionRequests(accountName, (err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getConversionRequests", getConversionRequestsNode);
}