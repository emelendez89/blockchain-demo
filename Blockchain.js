'use strict';

const Block = require('./Block.js')

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

module.exports = Blockchain
