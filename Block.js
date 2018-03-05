'use strict';

let CryptoJS = require("crypto-js");

class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
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

  isEqual(otherBlock) {
    return this.calculateHash() === otherBlock.calculateHash();
  }

  toString() {
    return `Block(${this.hash})\nIndex: ${this.index}, Timestamp: ${this.timestamp}\nData: ${this.data}`;
  }
}

module.exports = Block;
