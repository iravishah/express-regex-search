const { readFileSync } = require('fs');
const mongoose = require('mongoose');

const loadConfig = require('../lib/config');
const Logger = require('../logger/logger');

const config = loadConfig()
logger = global.logger = new Logger(config);

const { connect } = require('../db/connect');

require('../models/state');

const State = mongoose.model('State');

connect(config.mongo, () => {
  bulkInsert(start());
});

function start() {
  let data = readFileSync(`${__dirname}/city_list.csv`, 'utf-8');
  data = data.split('\n');
  data = data.splice(1, data.length);
  return data.map((ele) => {
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
}

function bulkInsert(data) {
  State.deleteMany({})
    .then(() => {
      return State.insertMany(data);
    })
    .then((docs) => {
      if (!docs || !docs.length) {
        logger.log(`no docs`);
        return;
      }
      logger.log('docs added!!');
      process.exit(0);
    })
    .catch(e => logger.log(`error while inserting multiple records :: ${err}`));
}