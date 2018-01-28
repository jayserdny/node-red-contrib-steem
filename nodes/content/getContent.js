var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getContentNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            let author = param.author.trim();
            let permlink = param.permlink.trim();

            steem.api.getContent(author, permlink, (err, response) => {
                msg.payload = response
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("getContent", getContentNode);
  }