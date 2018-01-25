var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function lookupAccountsNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let lowerBoundName;
            try {
                lowerBoundName = param.accounts.split(',').map(user => user.trim());;
            } catch (e) {
                lowerBoundName = param.accounts
            }
            
            steem.api.lookupAccounts(lowerBoundName, (err, response) => {
                msg.payload = response
                node.send(msg);
            });
            
        });
    }
    RED.nodes.registerType("lookupAccounts", lookupAccountsNode);
  }