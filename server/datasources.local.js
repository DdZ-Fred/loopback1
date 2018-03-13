'use strict';

const postgrePort = process.env.PGPORT || 5432;

const dataSources = {
  loopback1: {
    host: '/var/run/postgresql',
    port: `${postgrePort}`,
    database: 'loopback1',
    username: 'postgres',
    password: 'postgres',
    connector: 'postgresql',
  },
};

module.exports = dataSources;
