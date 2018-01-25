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
                usernames = param.usernames.split(',').map(user => user.trim());;
            } catch (e) {
                usernames = [param.usernames]
            }

            steem.api.lookupAccountNames(usernames, (err, response) => {
                msg.payload = response
                node.send(msg);
            });
            
        });
    }
    RED.nodes.registerType("lookupAccountNames", lookupAccountNamesNode);
  }