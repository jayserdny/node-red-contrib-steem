var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getAccountReferencesNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let accountId = parseInt(param.accountId);
            
            steem.api.getAccountReferences(accountId, (err, response) => {
                console.log(err)
                console.log(response)
                msg.payload = response
                node.send(msg);
            });
            
        });
    }
    RED.nodes.registerType("getAccountReferences", getAccountReferencesNode);
  }