var steem = require('../steem');
var validateParams = require('../util/validateFields');

module.exports = (RED) => {
    "use strict";
    function verifyAccountAuthorityNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var param = config;
        
        node.on('input', (msg) => {

            // Set initial status of the node
            node.status({});

            // Pass arguments to validator
            let validation = validateParams(param.nameOrId, param.signers);

            if (validation === false) {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "All params are required"
                });
                return false;
            }

            // Empty holder for the input
            let nameOrId = param.nameOrId.trim();

            let signers;
            try {
                // Convert from string to array of string
                signers = param.signers.split(',').map(user => user.trim());
            } catch (e) {
                  signers = param.signers;
            }
            
            steem.api.verifyAccountAuthority(nameOrId, signers, (err, response) => {
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
    RED.nodes.registerType("verifyAccountAuthority", verifyAccountAuthorityNode);
}