import 'dotenv/config';
import { exec } from 'child_process';
import { _log } from '../configs/utils';

const callbackpew = (error: any, stdout: string, stderr: string) => {
  if (error) _log.info(error);
  if (stdout) _log.info(stdout);
  if (stderr) _log.info(stderr);
};

exec('heroku config:set ATLAS_STRING="' + process.env.ATLAS_STRING + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set DB_NAME="' + process.env.DB_NAME + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set COLLECTION_PREFIX="' + process.env.COLLECTION_PREFIX + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set CORS_ORIGIN="' + process.env.CORS_ORIGIN + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set GAS_STATION_API_URL="' + process.env.GAS_STATION_API_URL + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set BLOCKNATIVE_API_URL="' + process.env.BLOCKNATIVE_API_URL + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set BLOCKNATIVE_API_KEY="' + process.env.BLOCKNATIVE_API_KEY + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set MAIN_WS_URL="' + process.env.MAIN_WS_URL + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set INFURA_URL="' + process.env.INFURA_URL + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set ALCHEMY_URL="' + process.env.ALCHEMY_URL + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set ETHERSCAN_KEY="' + process.env.ETHERSCAN_KEY + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set UNIV2="' + process.env.UNIV2 + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set UNIV3="' + process.env.UNIV3 + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set SUSHIV2="' + process.env.SUSHIV2 + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set REACT_APP_CHAIN_ID="' + process.env.REACT_APP_CHAIN_ID + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set REACT_APP_GOOGLE_ANALYTICS_ID="' + process.env.REACT_APP_GOOGLE_ANALYTICS_ID + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set REACT_APP_NETWORK_URL="' + process.env.REACT_APP_NETWORK_URL + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set SKIP_PREFLIGHT_CHECK="' + process.env.SKIP_PREFLIGHT_CHECK + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set REACT_APP_WS_URL_TROJAN="' + process.env.REACT_APP_WS_URL_TROJAN + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set REACT_APP_APP_IS_OFFLINE="' + process.env.REACT_APP_APP_IS_OFFLINE + '" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
exec('heroku config:set NPM_CONFIG_PRODUCTION="false" -a ' + process.env.HEROKU_APP_NAME, callbackpew);
