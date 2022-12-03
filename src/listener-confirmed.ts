import { startMongo, models } from './utils/mongo/config';
import { _log, timeout, KEYS } from './utils/configs/utils';
import { getPendingTxResponse } from './utils/web3/getTransactions';
import { proccessPending as pendingTx_uni_sushi } from './swapsDecoders/_uni_sushi/pending';
import { pendingToConfirm, trashToConfirm } from './utils/mongo/saveConfirmed';
import { ethers } from 'ethers';
import { keepAlive } from './utils/web3/wsProvider';

const { txM, g } = models;
const { whales } = g;
const serverName = 'qnConfirmed';
const SwV2SH = ['0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822', '0x000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9f'];
const SwapV2 = ['0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822', '0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d'];
const SwapV3 = ['0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67', '0x000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564'];

let whalesCache = new Array<any>();

startMongo(serverName).then(async (started) => {
  await timeout(5000);

  if (started) {
    whales.find({}, null, {}, (e, docs) => {
      if (!e) whalesCache = docs;
    });
    await timeout(2000);

    _log.start('listenRouter UniSwap V3');
    startListen(SwapV3);
    _log.start('listenRouter UniSwap V2');
    startListen(SwapV2);
    _log.start('listenRouter Sushiswap V2');
    startListen(SwV2SH);
  } else {
    keepAlive;
    _log.error('---> started ', started);
  }
});

const startListen = (filter: Array<any>) => {
  _log.info('startListen - Confirmend');
  const provider = new ethers.providers.WebSocketProvider(KEYS.CONFIRMED_URL);
  keepAlive({
    provider,
    onDisconnect: (err: any) => {
      startListen(filter);
      _log.error('The ws connection was closed', JSON.stringify(err, null, 2));
    }
  });

  provider.on(
    {
      topics: filter
    },
    async (data: any) => {
      const hash = data.transactionHash;
      _log.info('confirmed', hash);
      const [knownTx_, knownTx_g_] = await Promise.all([txM.pending.findOne({ hash }, null, {}), g.trash.findOne({ hash }, null, {})]);
      if (knownTx_) {
        const knownTx = knownTx_._doc;
        let nTx = { ...knownTx };
        delete nTx._id;
        pendingToConfirm(nTx, {}, serverName);
        return;
      }

      if (knownTx_g_) {
        const knownTx_g = knownTx_g_._doc;
        let nTx = { ...knownTx_g };
        delete nTx._id;
        trashToConfirm(nTx, {}, serverName);
        return;
      }

      const tx = await getPendingTxResponse(hash, provider);
      if (tx) {
        const whaleData = whalesCache.find((w) => (w ? w.address.toLowerCase() === tx.from.toLowerCase() : false));
        pendingTx_uni_sushi(tx, whaleData, true, provider);
      } else {
        _log.error('getPendingTxResponse ', hash, 'not found confirmed tx?');
      }
    }
  );
};
