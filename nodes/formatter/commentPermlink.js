var steem = require('../steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function commentPermlinkNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.parentAuthor, param.parentPermlink);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }

            let parentAuthor = param.parentAuthor.trim();
            let parentPermlink = param.parentPermlink.trim();

            var commentPermlink = steem.formatter.commentPermlink(parentAuthor, parentPermlink);
            msg.payload = commentPermlink;
            node.send(msg);
        });
    }
    RED.nodes.registerType("commentPermlink", commentPermlinkNode);
  }