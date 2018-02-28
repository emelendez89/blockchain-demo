'use strict';

let CryptoJS = require("crypto-js");

class Block {
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoJS.SHA256(this.index + this.previousHash + this.timestamp + this.data).toString();
    };

    isValid(previousBlock) {
        if (previousBlock.index + 1 !== this.index) {
            console.log('invalid index');
            return false;
        }
        if (previousBlock.hash !== this.previousHash) {
            console.log('invalid previoushash');
            return false;
        }
        return true;
    };
}

module.exports = Block;
