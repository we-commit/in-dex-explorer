import { startMongo, models } from './utils/mongo/config';
import { ENV, _log, KEYS, nowMs, timeout } from './utils/configs/utils';
import { MAIN_WS_URL_PROVIDER } from './utils/web3/providers';
import { getBlockInfo, getBlock } from './utils/web3/getBlocks';
import { saveBlock, updateBlock } from './utils/mongo/saveBlock';

const { BLOCKNATIVE_API_URL, GAS_STATION_API_URL, BLOCKNATIVE_API_OPT, GAS_STATION_API_OPT } = KEYS;
const { ES_BLOCK } = ENV;

const serverName = 'qnCommons';

startMongo(serverName).then(async (started) => {
  await timeout(5000);
  if (started) {
    startBlocks();

    setInterval(() => {
      proccessBlockQueue();
    }, 10000);
  } else {
    _log.warn('started:', started);
  }
});

const startBlocks = async () => {
  _log.start('startBlocks Go!');

  MAIN_WS_URL_PROVIDER.on('block', async (number: any) => {
    proccessBlock(number);
  });
};

const proccessBlock = async (number: number) => {
  try {
    _log.info('New Block: ', ES_BLOCK + number);
    const block = await getBlock(number, MAIN_WS_URL_PROVIDER);

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
  } catch (e: any) {
    _log.error('ProccessBlock catch ', number, e);
  }
  return;
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
