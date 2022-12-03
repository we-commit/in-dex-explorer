import { startMongo, models } from './utils/mongo/config';
import { KEYS, nowMs, timeout, _log } from './utils/configs/utils';
import { getPendingTxResponse } from './utils/web3/getTransactions';
import { proccessPending as pendingTx_uni_sushi } from './swapsDecoders/_uni_sushi/pending';
import { ethers } from 'ethers';
import { keepAlive } from './utils/web3/wsProvider';

const { g } = models;
const { whales, hashes } = g;
const serverName = 'qnPending';

let whalesCache = new Array<any>();

startMongo(serverName).then(async (started) => {
  await timeout(5000);

  if (started) {
    whales.find({}, null, {}, (e, docs) => {
      if (!e) whalesCache = docs;
    });

    startListen();
  } else {
    _log.warn('---> started ', started);
  }
});

const startListen = () => {
  _log.info('startListen - Mempool');
  const provider = new ethers.providers.WebSocketProvider(KEYS.CONFIRMED_URL);
  keepAlive({
    provider,
    onDisconnect: (err) => {
      startListen();
      _log.error('The ws connection was closed', JSON.stringify(err, null, 2));
    }
  });

  provider._subscribe('pending', ['newPendingTransactions'], async (hash: string) => {
    new hashes({
      hash,
      txHash: hash,
      timestampTx: nowMs()
    }).save(async (e: any) => {
      if (!e) {
        const tx = await getPendingTxResponse(hash, provider);
        if (tx) {
          const whaleData = whalesCache.find((w) => (w ? w.address.toLowerCase() === tx.from.toLowerCase() : false));
          pendingTx_uni_sushi(tx, whaleData, false, provider);
        }
      }
    });
  });
};
