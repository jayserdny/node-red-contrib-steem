# Node-Red nodes for Steem Blockchain
With this library, you will be able to use the Steem js library with just drag and drop.


## Available Nodes

**Accounts:**

- getAccounts
- getAccountCount
- getConversionRequests
- getAccountHistory
- getOwnerHistory
- getRecoveryRequest

**Content:**

- getContent
- getContentReplies
- getDiscussionsByAuthorBeforeDate
- getRepliesByLastUpdate

**Witnesses:**

- getActiveWitnesses
- getMinerQueue
- getWitnessByAccount
- getWitnessCount
- getWitnesses
- getWitnessesByVote

**Globals:**

- getChainProperties
- getConfig
- getCurrentMedianHistoryPrice
- getDynamicGlobalProperties
- getFeedHistory
- getHardforkVersion
- getNextScheduledHardfork
- getRewardFund
- getVestingDelegations

### Requirements

To run the nodes on your localhost you must have Node-RED installed on your localhost. 


### Installation

```bash
$ git clone https://github.com/jayserdny/node-red-contrib-steem
$ cd node-red-contrib-steem
$ npm install
```

To install the node modules on your localhost, install it into your Node-RED runtime.

```bash
$ sudo npm link
$ cd ~/.node-red
$ npm link node-red-contrib-steem
```

Run node-red.

```bash
$ node-red
```

Open a browser and go to the address http://127.0.0.1:1880.


### Contributing

To contribute fork the [node-red-contrib-steem repository](https://github.com/jayserdny/node-red-contrib-steem) and submit pull requests.


### Copyright and License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
