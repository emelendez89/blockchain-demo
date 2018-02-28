'use strict';

let CryptoJS = require("crypto-js");

class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoJS.SHA256(this.index + (this.previousHash || null) + this.timestamp + this.data).toString();
  };

  isValid(previousBlock) {
    if (previousBlock) {
      return (this.index === previousBlock.index + 1) && (this.previousHash === previousBlock.hash);
    } else {
      return this.index === 0 && this.previousHash === null;
    }
  };
}

module.exports = Block;
