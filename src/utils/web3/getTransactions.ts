import { _log } from '../configs/utils';

const getPendingTxResponse = async (hash: string, provider: any) => {
  try {
    const _txResponse = await getFromProviders(hash, provider);
    return _txResponse;
  } catch (e: any) {
    _log.error('getPendingTxResponse catch ', hash);
  }
  return null;
};

const getFromProviders = async (hash: string, provider: any) => {
  try {
    const txResponse = await goGetIt(hash, provider);
    if (txResponse) {
      const { to, from } = txResponse;
      if (to && from) {
        return txResponse;
      }
    }
  } catch (e: any) {
    if (e.message === 'noNetwork') {
      const txResponse = await goGetIt(hash, provider);
      if (txResponse) {
        const { to, from } = txResponse;
        if (to && from) {
          return txResponse;
        }
      }
    }
  }
  return null;
};

const goGetIt = async (hash: string, provider: any) => {
  try {
    let _txResponse = await provider.getTransaction(hash);
    if (_txResponse) return _txResponse;
  } catch (e: any) {
    _log.info(e.message);
  }

  try {
    let _txResponse = await provider.getTransaction(hash);
    if (_txResponse) return _txResponse;
  } catch (e: any) {
    _log.info(e.message);
  }

  return null;
};

export { getPendingTxResponse };
