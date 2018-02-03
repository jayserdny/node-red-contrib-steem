var steem = require('steem');

class SteemInstance {
    constructor() {}
  
    methods() {
      return steem;
    }
}
  
export const SteemInstance = new SteemInstance()