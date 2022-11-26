import 'dotenv/config';
import consola from 'consola';
import { ethers } from 'ethers';

const _log = consola;

const checksum = ethers.utils.getAddress;

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const nowMs = () => {
  return new Date().getTime();
};

const nowDate = () => {
  return new Date();
};

const ENV = {
  ATLAS_STRING: process.env.ATLAS_STRING || '',
  COLLECTION_PREFIX: process.env.COLLECTION_PREFIX || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '',
  ES_TX: 'https://etherscan.io/tx/',
  ES_ADDRESS: 'https://etherscan.io/address/',
  ES_BLOCK: 'https://etherscan.io/block/'
};

const KEYS = {
  GAS_STATION_API_URL: process.env.GAS_STATION_API_URL || '',
  GAS_STATION_API_OPT: {},
  BLOCKNATIVE_API_URL: process.env.BLOCKNATIVE_API_URL || '',
  BLOCKNATIVE_API_OPT: {
    headers: { Authorization: process.env.BLOCKNATIVE_API_KEY || '' }
  },
  MAIN_WS_URL: process.env.MAIN_WS_URL || '',
  INFURA_URL: process.env.INFURA_URL || '',
  ETHERSCAN_KEY: process.env.ETHERSCAN_KEY || '',
  ALCHEMY_URL: process.env.ALCHEMY_URL || '',
};

const ROUTERS = {
  UNIV3: checksum(process.env.UNIV3 || ''),
  UNIV2: checksum(process.env.UNIV2 || ''),
  SUSHIV2: checksum(process.env.SUSHIV2 || '')
};

const TOKEN_LIST_ALL = Array<string>(
  process.env.WRAPPED || '',
  process.env.YEARN || '',
  process.env.ROLL || '',
  process.env.SUSHISWAP || '',
  process.env.ONE_INCH || '',
  process.env.COINGECKO || '',
  process.env.COMPOUND || '',
  process.env.DEFIPRIME || '',
  process.env.MESSARI || '',
  process.env.OPYN || '',
  process.env.SNX || '',
  process.env.SET || '',
  process.env.AVE || '',
  process.env.AGORA || '',
  process.env.CMCDEFI || '',
  process.env.CMCSTABLECOIN || '',
  process.env.CMC200ERC20 || '',
  process.env.KLEROS || '',
  process.env.FURUCOMBO || '',
  process.env.KYBER || '',
  process.env.MYCRYPTOAPI || '',
  process.env.ZAPPER || '',
  process.env.UMA || '',
  process.env.BAZAR || '',
  process.env.ZERION || ''
);

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const res = Math.floor(Math.random() * (max - min + 1)) + min;
  return res;
}

export { ENV, ROUTERS, KEYS, TOKEN_LIST_ALL, nowDate, nowMs, timeout, _log, checksum, getRandomInt };
