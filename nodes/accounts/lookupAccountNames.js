var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function lookupAccountNamesNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {
            let usernames;
            try {
                usernames = param.accounts.split(',').map(user => user.trim());;
            } catch (e) {
                usernames = param.accounts
            }
            
            steem.api.lookupAccountNames(usernames, (err, response) => {
                msg.payload = response
                node.send(msg);
            });
            
        });
    }
    RED.nodes.registerType("lookupAccountNames", lookupAccountNamesNode);
  }