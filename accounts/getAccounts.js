var steem = require('steem');
var request = require('request');

module.exports = (RED) => {
    "use strict";
    function getAccountsNode(config) {
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
            
            steem.api.getAccounts(usernames, (err, response) => {
                msg.payload = response
                node.send(msg);
            });
            
        });
    }
    RED.nodes.registerType("getAccounts", getAccountsNode);
  }