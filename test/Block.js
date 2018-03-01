const assert = require('chai').assert;
const Block = require('../Block');

const CryptoJS = require('crypto-js');

describe('Block', function () {
  describe('constructor()', function () {
    it('should create a block without previous hash', function () {
      const index = 0;
      const timestamp = (new Date()).valueOf();
      const testData = "Some test data";
      const block = new Block(index, null, timestamp, testData);

      assert.exists(block.index);
      assert.notExists(block.previousHash);
      assert.exists(block.timestamp);
      assert.exists(block.data);
      assert.exists(block.hash);

      assert.equal(block.index, index);
      assert.equal(block.timestamp, timestamp);
      assert.equal(block.data, testData);

      assert.equal(block.hash, CryptoJS.SHA256(block.index + block.timestamp + block.data));
    });

    it('should create a block with previous hash', function () {
      const index = 0;
      const prevHash = '2sdfasdfasdfasdf435';
      const timestamp = (new Date()).valueOf();
      const testData = "Some test data";
      const block = new Block(index, prevHash, timestamp, testData);

      assert.exists(block.index);
      assert.exists(block.previousHash);
      assert.exists(block.timestamp);
      assert.exists(block.data);
      assert.exists(block.hash);

      assert.equal(block.index, index);
      assert.equal(block.previousHash, prevHash);
      assert.equal(block.timestamp, timestamp);
      assert.equal(block.data, testData);

      assert.equal(block.hash, CryptoJS.SHA256(block.index + block.previousHash + block.timestamp + block.data).toString());
    });
  });

  describe('calculateHash()', function () {
    it('should calculate the block hash', function () {
      const index = 0;
      const prevHash = '2sdfasdfasdfasdf435';
      const timestamp = (new Date()).valueOf();
      const testData = "Some test data";
      const block = new Block(index, null, timestamp, testData);

      assert.equal(block.calculateHash(), CryptoJS.SHA256(block.index + block.previousHash + block.timestamp + block.data));
    });
  });

  describe('isValid()', function () {
    it('should check block validity without previous hash', function () {
      const block = new Block(0, null, (new Date()).valueOf(), "Some test data");

      assert.equal(block.isValid(), true);
    });

    it('should check block validity with previous hash', function () {
      const firstBlock = new Block(0, null, (new Date()).valueOf(), "Some test data");
      const firstBlockHash = firstBlock.calculateHash();

      const secondBlock = new Block(1, firstBlockHash, (new Date()).valueOf(), "Second block data");

      assert.equal(secondBlock.isValid(firstBlock), true);
    });
  });
});