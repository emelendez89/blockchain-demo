const assert = require('chai').assert;
const Blockchain = require('../Blockchain');

describe('Blockchain', function () {
  describe('constructor()', function () {
    it('should create a new blockchain', function () {
      const blkch = new Blockchain();
      assert.exists(blkch.blockchain);
    });
  });

  describe('addData()', function () {
    it('should create a new blockchain', function () {
      const blkch = new Blockchain();
      assert.exists(blkch.blockchain);
    });
  });

  describe('getLatestBlock()', function () {
    it('should create a new blockchain', function () {
      const blkch = new Blockchain();
      assert.exists(blkch.blockchain);
    });
  });
});