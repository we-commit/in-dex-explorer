import { providers } from 'ethers';
import { KEYS, _log } from '../configs/utils';

const { INFURA_URL, ALCHEMY_URL, BLOCKS_URL, CONFIRMED_URL, MEMPOOL_URL } = KEYS;

const { WebSocketProvider } = providers;

const BLOCKS_PROVIDER = new WebSocketProvider(BLOCKS_URL);
const MEMPOOL_PROVIDER = new WebSocketProvider(MEMPOOL_URL);
const CONFIRMED_PROVIDER = new WebSocketProvider(CONFIRMED_URL);

const INFURA_WS_PROVIDER = new WebSocketProvider(INFURA_URL);
const ALCHEMY_WS_PROVIDER = new WebSocketProvider(ALCHEMY_URL);

export { BLOCKS_PROVIDER, MEMPOOL_PROVIDER, CONFIRMED_PROVIDER, INFURA_WS_PROVIDER, ALCHEMY_WS_PROVIDER };
