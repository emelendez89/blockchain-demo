const assert = require('chai').assert;
const sinon = require('sinon');
const Blockchain = require('../Blockchain');

describe('Blockchain', function () {
  describe('constructor()', function () {
    it('should create a new blockchain', function () {
      const blkch = new Blockchain();
      assert.exists(blkch.blockchain);
    });
  });

  describe('addData()', function () {
    it('should add data to the blockchain', function () {
      const blkch = new Blockchain();
      const firstData = { msg: 'First block data.'};
      const secondData = { msg: 'Second block data.'};
      const thirdData = { msg: 'Third block data.'};
      assert.equal(blkch.blockchain.length, 1);
      blkch.addData(firstData);
      assert.equal(blkch.blockchain.length, 2);
      assert.equal(blkch.getLatestBlock().index, blkch.blockchain.length - 1);
      assert.equal(blkch.getLatestBlock().data, JSON.stringify(firstData));
      blkch.addData(secondData);
      assert.equal(blkch.blockchain.length, 3);
      assert.equal(blkch.getLatestBlock().index, blkch.blockchain.length - 1);
      assert.equal(blkch.getLatestBlock().data, JSON.stringify(secondData));
      blkch.addData(thirdData);
      assert.equal(blkch.blockchain.length, 4);
      assert.equal(blkch.getLatestBlock().index, blkch.blockchain.length - 1);
      assert.equal(blkch.getLatestBlock().data, JSON.stringify(thirdData));
    });
  });

  describe('getLatestBlock()', function () {
    it('should get latest block', function () {
      const blkch = new Blockchain();
      const tbData = { msg: 'Third block data.'};
      blkch.addData({ msg: 'First block data.'});
      blkch.addData({ msg: 'Second block data.'});
      blkch.addData(tbData);
      assert.equal(blkch.getLatestBlock().data, JSON.stringify(tbData));
      assert.equal(blkch.getLatestBlock().index, blkch.blockchain.length - 1);
    });
  });

  describe('isValid()', function () {
    it('should mark an authentic blockchain as valid', function () {
      const blkch = new Blockchain();
      const logger = () => {};
      blkch.addData({ msg: 'First block data.'});
      blkch.addData({ msg: 'Second block data.'});
      blkch.addData({ msg: 'Third block data.'});
      assert.equal(blkch.isValid(), true);
    });

    it('should return false when the block data has been modified', function () {
      const blkch = new Blockchain();
      const logger = () => {};
      blkch.addData({ msg: 'First block data.'});
      blkch.addData({ msg: 'Second block data.'});
      blkch.addData({ msg: 'Third block data.'});
      blkch.blockchain[2].data = JSON.stringify({ msg: 'We are messing with the blockchain!'});
      assert.equal(blkch.isValid(), false);
    });

    it('should return false when the block data has been modified even if the hash is set accordingly', function () {
      const blkch = new Blockchain();
      const logger = () => {};
      blkch.addData({ msg: 'First block data.'});
      blkch.addData({ msg: 'Second block data.'});
      blkch.addData({ msg: 'Third block data.'});
      blkch.blockchain[2].data = JSON.stringify({ msg: 'We are messing with the blockchain!'});
      blkch.blockchain[2].hash = blkch.blockchain[2].hash = blkch.blockchain[2].calculateHash();
      assert.equal(blkch.isValid(), false);
    });
  });

  describe('conciliate()', function () {
    it('should select the longest chain as the valid one if both are valid', function () {
      const blkch1 = new Blockchain();
      const blkch2 = new Blockchain();

      blkch1.addData({ msg: 'First block data. Blockchain 1.'});
      blkch1.addData({ msg: 'Second block data. Blockchain 1.'});
      blkch1.addData({ msg: 'Third block data. Blockchain 1.'});

      blkch2.addData({ msg: 'First block data. Blockchain 2.'});
      blkch2.addData({ msg: 'Second block data. Blockchain 2.'});
      blkch2.addData({ msg: 'Third block data. Blockchain 2.'});
      blkch2.addData({ msg: 'Fourth block data. Blockchain 2.'});

      blkch1.conciliate(blkch2);

      assert.equal(blkch1.blockchain.length, blkch2.blockchain.length);
      assert.equal(blkch1.blockchain[0], blkch2.blockchain[0]);
      assert.equal(blkch1.blockchain[1], blkch2.blockchain[1]);
      assert.equal(blkch1.blockchain[2], blkch2.blockchain[2]);
      assert.equal(blkch1.blockchain[3], blkch2.blockchain[3]);
    });

    it('should select the valid chain if only one is valid', function () {
      const blkch1 = new Blockchain();
      const blkch2 = new Blockchain();
      const blkch3 = new Blockchain();

      blkch1.addData({ msg: 'First block data. Blockchain 1.'});
      blkch1.addData({ msg: 'Second block data. Blockchain 1.'});
      blkch1.addData({ msg: 'Third block data. Blockchain 1.'});

      blkch2.addData({ msg: 'First block data. Blockchain 2.'});
      blkch2.addData({ msg: 'Second block data. Blockchain 2.'});
      blkch2.addData({ msg: 'Third block data. Blockchain 2.'});
      blkch2.addData({ msg: 'Fourth block data. Blockchain 2.'});
      blkch2.blockchain[1].data = JSON.stringify({ msg: 'Compromised block data. Blockchain 2.'});
      blkch2.blockchain[1].hash = blkch2.blockchain[1].calculateHash();

      blkch1.conciliate(blkch2);
      blkch2.conciliate(blkch1);

      assert.equal(blkch1.blockchain.length, blkch1.blockchain.length);
      assert.equal(blkch1.blockchain[0], blkch1.blockchain[0]);
      assert.equal(blkch1.blockchain[1], blkch1.blockchain[1]);
      assert.equal(blkch1.blockchain[2], blkch1.blockchain[2]);

      assert.equal(blkch2.blockchain.length, blkch1.blockchain.length);
      assert.equal(blkch2.blockchain[0], blkch1.blockchain[0]);
      assert.equal(blkch2.blockchain[1], blkch1.blockchain[1]);
      assert.equal(blkch2.blockchain[2], blkch1.blockchain[2]);
    });
  });

  describe('show()', function () {
    it('should display the blockchain in a user friendly way', function () {
      const blkch = new Blockchain();
      const logger = sinon.spy();
      blkch.addData({ msg: 'First block data.'});
      blkch.addData({ msg: 'Second block data.'});
      blkch.addData({ msg: 'Third block data.'});
      blkch.show(logger);
      assert.equal(logger.callCount, 4);
    });
  });
});