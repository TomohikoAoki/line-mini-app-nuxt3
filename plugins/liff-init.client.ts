/**
 * @description: LIFFの初期化を行うプラグイン
 * @see: https://developers.line.biz/ja/docs/liff/developing-liff-apps/
 * @todo: liff SDKと初期化、ログイン処理をprovieに追加
 * @todo: 初期化に必要なliffIdはruntimeConfigから取得する(予定)
 * @todo: liffIdは開発用、審査用、本番用で異なるため、envで切り替える
 */

import liff from '@line/liff';

export default defineNuxtPlugin(nuxtApp => {
    const runtimeConfig = useRuntimeConfig()

    const initResult: Promise<string | void> = liff.init({ liffId: `${runtimeConfig.public.liffId}`, withLoginOnExternalBrowser: true })
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