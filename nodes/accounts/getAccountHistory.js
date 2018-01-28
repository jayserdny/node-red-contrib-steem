var steem = require('steem');

module.exports = (RED) => {
    "use strict";
    function getAccountHistoryNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            steem.api.getAccountHistory(param.account, param.from, param.limit
            , (err, response) => {
                // If the query is correct, return the response
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
    RED.nodes.registerType("getAccountHistory", getAccountHistoryNode);
}