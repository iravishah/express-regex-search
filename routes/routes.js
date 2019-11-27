//@ts-check
"use strict"

module.exports = () => {
  const express = require('express');
  const router = express.Router();

  const utility = require('../lib/utils');
  const state = require('../controller/state');

  router.get('/v1.0/ping',
    utility.ping
  );

  router.get('/v1.0/state',
    utility.authenicate,
    state.listState
  );

  router.get('/v1.0/town',
    utility.authenicate,
    state.listTown
  );

  router.get('/v1.0/district',
    utility.authenicate,
    state.listDistrict
  );

  router.all('*', (req, res) => {
    res.status(401).json({ error: 'Unauthorised access', code: 401 });
  });

  return router;
}
