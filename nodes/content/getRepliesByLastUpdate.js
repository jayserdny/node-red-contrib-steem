var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getRepliesByLastUpdateNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            let startAuthor = param.startAuthor.trim();
            let startPermlink = param.startPermlink.trim();
            let limit = parseInt(param.limit.trim());

            steem.api.getRepliesByLastUpdate(startAuthor, startPermlink, limit, (err, response) => {
                msg.payload = response
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("getRepliesByLastUpdate", getRepliesByLastUpdateNode);
}