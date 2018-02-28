'use strict';

let Block = require('./Block.js')

class Blockchain {
  constructor(){
    //Genesis block should always be hardcoded
    //If you were to modify the Genesis you should re-generate the hash manually
    //because this one can't be mined.
    let getGenesisBlock = () => {
        return new Block(0, "0", (new Date()).valueOf(), "my genesis block!!");
    };
    this.blockchain = [getGenesisBlock()];


  }

  getLatestBlock(){
    return this.blockchain[this.blockchain.length - 1];
  }

  addBlock(blockData) {
    let latestBlock = this.getLatestBlock();
    let newBlock = new Block(latestBlock.index + 1, latestBlock.hash, (new Date()).valueOf(), blockData);
      if (newBlock.isValid(latestBlock)) {
          this.blockchain.push(newBlock);
      }
  };
}




let replaceChain = (newBlocks) => {
    if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcast(responseLatestMsg());
    } else {
        console.log('Received blockchain invalid');
    }
};

//let isValidChain = (blockchainToValidate) => {
//    if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
//        return false;
//    }
//    let tempBlocks = [blockchainToValidate[0]];
//    for (let i = 1; i < blockchainToValidate.length; i++) {
//        if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
//            tempBlocks.push(blockchainToValidate[i]);
//        } else {
//            return false;
//        }
//    }
//    return true;
//};

module.exports = Blockchain
