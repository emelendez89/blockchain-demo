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

class Blockchain {
  constructor() {
    // Genesis block hardcoded, the hash is created at construction time.
    const genesisBlock = new Block(0, null, (new Date()).valueOf(), "Welcome to the Blockchain!");
    this.blockchain = [];
    this.blockchain.push(genesisBlock);
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  addData(blockData) {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(latestBlock.index + 1, latestBlock.hash, (new Date()).valueOf(), blockData);

    if (newBlock.isValid(latestBlock)) {
      this.blockchain.push(newBlock);
    }

    return newBlock;
  }

  isValid() {
    let previousBlock, isValid = true;

    for (let i = 0; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const validBlock = (currentBlock.index === i) && currentBlock.isValid(previousBlock) && (currentBlock.calculateHash() === currentBlock.hash);

      if (!validBlock) {
        isValid = false;
        break;
      }
      previousBlock = currentBlock;
    }

    return isValid;
  }

  conciliate(otherBlockchain) {
    if (this.isValid()) {
      if (otherBlockchain.isValid()) {

        if (otherBlockchain.blockchain.length > this.blockchain.length) {
          this.blockchain = otherBlockchain.blockchain;
        }

      }
    } else {
      if (otherBlockchain.isValid()) {
        this.blockchain = otherBlockchain.blockchain;
      }
    }
  }

  show(logger) {
    if (!logger) {
      logger = console.log;
    }

    for (let i = 0; i < this.blockchain.length; i++) {
      logger(`${this.blockchain[i]}`);
    }
  }
}

export default Blockchain;
