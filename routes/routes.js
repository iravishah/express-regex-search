//@ts-check
"use strict"

module.exports = () => {
  const express = require('express');
  const router = express.Router();

  const utility = require('../lib/utils');
  const state = require('../controller/state');

  router.get('/ping',
    utility.ping
  );

  router.get('/state',
    utility.authenicate,
    state.listState
  );

  router.get('/town',
    utility.authenicate,
    state.listTown
  );

  router.get('/district',
    utility.authenicate,
    state.listDistrict
  );

  router.all('*', (req, res) => {
    res.status(401).json({ error: 'Unauthorised access', code: 401 });
  });

  return router;
}
