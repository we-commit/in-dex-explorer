import { startMongo, models } from './utils/mongo/config';
import { MAIN_WS_URL_PROVIDER, ETHERSCAN_PROVIDER, mempoolProviders } from './utils/web3/providers';
import { nowMs, timeout, _log } from './utils/configs/utils';
import { getPendingTxResponse } from './utils/web3/getTransactions';
import { proccessPending as pendingTx_uni_sushi } from './swapsDecoders/_uni_sushi/pending';

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

    startListenPending();
  } else {
    _log.warn('---> started ', started);
  }
});

const startListenPending = () => {
  console.log('startListenPending');

  MAIN_WS_URL_PROVIDER._subscribe('pending', ['newPendingTransactions'], async (hash: string) => {
    new hashes({
      hash,
      txHash: hash,
      timestampTx: nowMs()
    }).save(async (e: any) => {
      if (!e) {
        const tx = await getPendingTxResponse(hash, mempoolProviders, ETHERSCAN_PROVIDER);
        if (tx) {
          const whaleData = whalesCache.find((w) => (w ? w.address.toLowerCase() === tx.from.toLowerCase() : false));
          pendingTx_uni_sushi(tx, whaleData, false, mempoolProviders);
        }
      }
    });
  });
};
