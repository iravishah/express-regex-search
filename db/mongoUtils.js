const mongoose = require('mongoose');

require('../models/state');

const State = mongoose.model('State');

const { wait } = require('../lib/utils');
/**
 *
 *
 * @param {*} query
 * @param {*} select
 * @param {*} opts
 * @returns promise
 */
async function list(query = {}, select = {}, opts = {}) {
  return await wait(State.find, State, query, select, opts);
}

module.exports = {
  list
}