const { get } = require('lodash');

const m = require('../responses/responses.json');

const { reply, capitalize } = require('../lib/utils');
const { list } = require('../db/mongoUtils');
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function listState(req, res, next) {
  const query = { state: { $regex: new RegExp(req.query.q), $options: 'i' } };

  const [err, data] = await list(query, { _id: 0, state: 1, district_code: 1, district: 1 });
  if (err) {
    return reply(res, m.m102);
  }
  if (!data || !data.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(data);
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function listTown(req, res, next) {
  const query = { town: { $regex: new RegExp(req.query.q), $options: 'i' } };

  const [err, data] = await list(query, { town: 1, state: 1, district: 1, _id: -1 });
  if (err) {
    return reply(res, m.m102);
  }
  if (!data || !data.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(data);
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function listDistrict(req, res, next) {
  const query = { district: { $regex: new RegExp(req.query.q), $options: 'i' } };

  let [err, data] = await list(query, { town: 1, urban_status: 1, state_code: 1, state: 1, district_code: 1, district: 1, _id: -1 });
  if (err) {
    return reply(res, m.m102);
  }
  if (!data || !data.length) {
    return res.status(200).json([]);
  }

  data = data.map((ele) => {
    let temp = {};
    for (let prop in ele) {
      if (prop === 'town') {
        temp[prop] = ele[prop]
      } else {
        temp[capitalize(prop)] = ele[prop];
      }
    }
    return temp;
  });

  res.status(200).json(data);
}

module.exports = {
  listState,
  listTown,
  listDistrict
}