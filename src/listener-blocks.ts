import { startMongo, models } from './utils/mongo/config';
import { ENV, _log, KEYS, nowMs, timeout } from './utils/configs/utils';
import { getBlockInfo, getBlock } from './utils/web3/getBlocks';
import { saveBlock, updateBlock } from './utils/mongo/saveBlock';
import { ethers } from 'ethers';
import { keepAlive } from './utils/web3/wsProvider';

const { BLOCKNATIVE_API_URL, GAS_STATION_API_URL, BLOCKNATIVE_API_OPT, GAS_STATION_API_OPT } = KEYS;
const { ES_BLOCK } = ENV;

const serverName = 'qnCommons';

startMongo(serverName).then(async (started) => {
  await timeout(5000);
  if (started) {
    startListen();

    setInterval(() => {
      proccessBlockQueue();
    }, 10000);
  } else {
    _log.warn('started:', started);
  }
});

const startListen = async () => {
  _log.start('startListen - Blocks');
  const provider = new ethers.providers.WebSocketProvider(KEYS.CONFIRMED_URL);
  keepAlive({
    provider,
    onDisconnect: (err) => {
      startListen();
      console.error('The ws connection was closed', JSON.stringify(err, null, 2));
    }
  });

  provider.on('block', async (number: any) => {
    const block = await getBlock(number, provider);

    if (block) {
      saveBlock({
        blockLink: ES_BLOCK + block.number,
        blockHash: block.hash,
        blockNumber: block.number,
        timestampTx: nowMs(),
        blockHeader: block,
        by: serverName
      });
    }
  });
};

const proccessBlockQueue = async () => {
  try {
    const b = await models.g.blocks.findOne({ fullyUpdated: false }, null, { sort: { timestampTx: -1 } });
    if (b) {
      if (b.blockNumber) {
        const [gasnowResponse, bncResponseData] = await Promise.all([
          getBlockInfo(GAS_STATION_API_URL, GAS_STATION_API_OPT),
          getBlockInfo(BLOCKNATIVE_API_URL, BLOCKNATIVE_API_OPT)
        ]);

        if (bncResponseData && gasnowResponse) {
          await updateBlock(b.blockHash, b.blockNumber, {
            responseData: bncResponseData,
            responseDataGas: gasnowResponse
          });
        }
      }
    }
  } catch (e: any) {
    _log.warn('proccessBlockQueue catch', e.message);
  }

  return;
};
