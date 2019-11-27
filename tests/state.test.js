const { readFileSync } = require('fs');
const should = require('should');
const mongoose = require('mongoose');
const State = require('../controller/state');

require('../models/state');

const state = mongoose.model('State');

describe('Main Testsuit', () => {
  before(() => {
    let data = readFileSync(`${global.appRoot}/loadData/city_list.csv`, 'utf-8');
    data = data.split('\n');
    data = data.splice(1, data.length);
    data = data.map((ele) => {
      ele = ele.split(',');
      return {
        sr_no: ele[0],
        town: ele[1],
        urban_status: ele[2],
        state_code: ele[3],
        state: ele[4],
        district_code: ele[5],
        district: ele[6]
      };
    });
    return state.deleteMany({})
    .then(() => {
      return state.insertMany(data);
    })
    .then((docs) => {
      if (!docs || !docs.length) {
        logger.log(`no docs`);
        return;
      }
      logger.log('docs added!!');
      return true;
    })
    .catch(e => logger.log(`error while inserting multiple records :: ${err}`));
  });

  describe('State Testsuit', () => {
    describe('Get state testsuite', () => {
      describe('success scenarios', () => {
        it('should get states', async () => {
          let res = getRes(function (status, data) {
            should(status).eql(200);
            return true;
          });
          const req = {
            query: {
              q: 'Kera'
            }
          }
          return await State.listState(req, res);
        });
        it('should return empty list', async () => {
          let res = getRes(function (status, data) {
            should(status).eql(200);
            return true;
          });
          const req = {
            query: {
              q: 'zzzzz'
            }
          }
          return await State.listState(req, res);
        });
      });
    });
  });

  describe('Town Testsuit', () => {
    describe('Get town testsuite', () => {
      describe('success scenarios', () => {
        it('should get towns', async () => {
          let res = getRes(function (status, data) {
            should(status).eql(200);
            return true;
          });
          const req = {
            query: {
              q: 'Phule'
            }
          }
          return await State.listTown(req, res);
        });
        it('should return empty list', async () => {
          let res = getRes(function (status, data) {
            should(status).eql(200);
            return true;
          });
          const req = {
            query: {
              q: 'zzzzz'
            }
          }
          return await State.listTown(req, res);
        });
      });
    });
  });

  describe('District Testsuit', () => {
    describe('Get district testsuite', () => {
      describe('success scenarios', () => {
        it('should get districts', async () => {
          let res = getRes(function (status, data) {
            should(status).eql(200);
            return true;
          });
          const req = {
            query: {
              q: 'Jaip'
            }
          }
          return await State.listDistrict(req, res);
        });
        it('should return empty list', async () => {
          let res = getRes(function (status, data) {
            should(status).eql(200);
            return true;
          });
          const req = {
            query: {
              q: 'zzzzz'
            }
          }
          return await State.listDistrict(req, res);
        });
      });
    });
  });

});
function getRes(callback) {
  return {
    _status: null,
    _data: null,
    status: function (status) {
      this._status = status;
      return this;
    },
    json: function (data) {
      this._data = data;
      callback(this._status, this._data);
      return this;
    }
  }
}