var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getAccountHistoryNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            console.log(param.account, param.from, param.limit)
            steem.api.getAccountHistory(param.account, param.from, param.limit
            , (err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getAccountHistory", getAccountHistoryNode);
}