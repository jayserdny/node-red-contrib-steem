var steem = require('../steem');

module.exports = (RED) => {
    "use strict";
    function getWitnessCountNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        
        node.on('input', (msg) => {
            
            steem.api.getWitnessCount((err, response) => {
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
    RED.nodes.registerType("getWitnessCount", getWitnessCountNode);
}