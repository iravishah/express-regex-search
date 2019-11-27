const mongoose = require('mongoose');
const { merge } = require('lodash');

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
  opts = merge(opts, { lean: true });
  return await wait(State.find, State, query, select, opts);
}

module.exports = {
  list
}