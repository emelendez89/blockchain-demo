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

    if (typeof blockData === 'object') {
      const data = JSON.stringify(blockData);
    }

    const newBlock = new Block(latestBlock.index + 1, latestBlock.hash, (new Date()).valueOf(), data || blockData);

    if (newBlock.isValid(latestBlock)) {
      this.blockchain.push(newBlock);
    }

    return newBlock;
  }

  isValid() {
    // if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(genesisBlock())) {
    //     return false;
    // }
    // let tempBlocks = [blockchainToValidate[0]];
    // for (let i = 1; i < blockchainToValidate.length; i++) {
    //     if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
    //         tempBlocks.push(blockchainToValidate[i]);
    //     } else {
    //         return false;
    //     }
    // }
    // return true;
  }

  conciliate(otherBlockchain) {
    // if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
    //   console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
    //   blockchain = newBlocks;
    //   broadcast(responseLatestMsg());
    // } else {
    //   console.log('Received blockchain invalid');
    // }
  }

  show() {

  }
}

module.exports = Blockchain
