import { startMongo, models } from './utils/mongo/config';
import { _log, timeout } from './utils/configs/utils';
import { pendingOld } from './utils/mongo/saveConfirmed';

const { txM, g } = models;

const FIXER_INTERVAL: number = 60000 * 1;
const FIXER_INTERVAL_G: number = 60000 * 60;

const serverName = 'dbFixer';

startMongo(serverName).then(async (started) => {
  await timeout(5000);

  if (started) {
    _log.start('startFixer Go run every', FIXER_INTERVAL / 60000, 'minutes');
    startFixerJustKill();
    startFixerG();

    setInterval(() => {
      startFixerJustKill();
    }, FIXER_INTERVAL);

    setInterval(() => {
      startFixerG();
    }, FIXER_INTERVAL_G);
  } else {
    _log.warn('---> startFixer ', started);
  }
});

const startFixerJustKill = async () => {
  const old_txs = 7;

  let end = new Date();
  end.setMinutes(new Date().getMinutes() - old_txs);
  _log.start('startFixer starting to fix all txs older than', old_txs, 'minutes');

  const _txM = await txM.pending.find({ timestampTx: { $lt: end.getTime() } }, {});
  if (_txM) fixOlds(_txM);
};

const fixOlds = async (oldTxs: Array<any>) => {
  try {
    for (const tx of oldTxs) {
      let nTx = { ...tx._doc };
      delete nTx._id;
      pendingOld({ ...nTx }, serverName);
    }
  } catch (e) {
    _log.error('fixOlds catch ', e);
  }
};

const startFixerG = async () => {
  const old_g = 240;

  let end = new Date();
  end.setMinutes(new Date().getMinutes() - old_g);
  _log.start('startFixerG starting to delete all trash hashes older than', old_g, 'minutes');

  await g.hashes.deleteMany({ timestampTx: { $lt: end.getTime() } }, {});
  await g.trash.deleteMany({ timestampTx: { $lt: end.getTime() } }, {});
};
