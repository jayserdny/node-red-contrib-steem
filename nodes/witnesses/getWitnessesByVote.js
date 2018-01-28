var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getWitnessesByVoteNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let from = parseInt(param.from.trim());
            let limit = parseInt(param.limit.trim());
            
            steem.api.getWitnessesByVote(from, limit, (err, response) => {
                msg.payload = response
                node.send(msg);
            });        
        });
    }
    RED.nodes.registerType("getWitnessesByVote", getWitnessesByVoteNode);
}