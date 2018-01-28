var steem = require('steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function getWitnessesByVoteNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

             // Set initial status of the node
             node.status({});

             // Pass arguments to validator
             let validation = validateParams(param.from, param.limit);
 
             if (validation === false) {
                 node.status({
                     fill: "red",
                     shape: "ring",
                     text: "All params are required"
                 });
                 return false;
             }

            let from = parseInt(param.from.trim());
            let limit = parseInt(param.limit.trim());
            
            steem.api.getWitnessesByVote(from, limit, (err, response) => {
                // Check if the response is correct
                if (response) {
                    msg.payload = response;
                    node.send(msg);
                }
                // Catch the error and let the client know
                else {
                    // Send the error to the console as well
                    node.error(err, msg);
                    node.status({
                        fill: "red",
                        shape: "ring",
                        text: err
                    });
                    // replace the payload with the actual error
                    msg.payload = err.toString();
                }
            });        
        });
    }
    RED.nodes.registerType("getWitnessesByVote", getWitnessesByVoteNode);
}