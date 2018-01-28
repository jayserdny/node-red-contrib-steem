var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getDiscussionsByAuthorBeforeDateNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            let author = param.author.trim();
            let startPermlink = param.startPermlink.trim();
            let beforeDate = parseInt(param.beforeDate.trim());
            let limit = parseInt(param.limit.trim());

            steem.api.getDiscussionsByAuthorBeforeDate(author, startPermlink, beforeDate, limit, (err, response) => {
                msg.payload = response
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("getDiscussionsByAuthorBeforeDate", getDiscussionsByAuthorBeforeDateNode);
  }