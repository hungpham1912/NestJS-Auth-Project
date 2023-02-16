import { getConfig } from '../lib/config.lib';

export const ENV_CONFIG = {
  database: {
    host: getConfig('database.host'),
    username: getConfig('database.username'),
    password: getConfig('database.password'),
    database: getConfig('database.database'),
  },
  jwt: {
    secret: getConfig('jwt.secret'),
  },
};
