
import liff from '@line/liff';


export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()

  const initResult = liff.init({ liffId: '2001061637-2gNwm9z5', withLoginOnExternalBrowser: true })
    .then(() => {
      console.log('liff.init() done');
    })
    .catch(error => {
      console.log(`liff.init() failed: ${error}`);
      if (!process.env.liffId) {
        console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.');
      }
      return Promise.reject(error);
    });
  return {
    provide: {
      liff: liff,
      liffInit: initResult
    }
  }
})