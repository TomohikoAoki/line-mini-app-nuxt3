<template>
    <div class="home">
        <div class="top-image">
            <SvgBase icon-name="top-image" viewBox="0 0 352 352" iconColor="#efb94b" iconTitle="トップイメージ">
                <SvgDataTopImage></SvgDataTopImage>
            </SvgBase>
        </div>
        <p class="top-text">ラインと連携したハートフルのアプリ。<br>ポイントの確認や、ポイント付与、ポイントの利用ができます</p>
        <!-- <div class="login-area">
            <button v-if="showButton" @click="login" class="home__buttons__button button--primary">LINEでログイン</button>
        </div> -->
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { startLoading, endLoading } = useLoading()
const { setUserToken, setUserName, getUserToken } = useUser()
const { $liffInit, $liff } = useNuxtApp()

startLoading()

/**
 * @description ログイン処理
 * @todo プラグインでliffの初期化が終わったら、ユーザーのトークンを取得して、ユーザー名を取得して、トップページに遷移する
 * @todo 初期化でエラーが返ってきたら、エラーをコンソールに出力, lineのログインボタンを表示する(予定)
 */
onMounted(() => {
    if (!getUserToken()) {
        $liffInit
            .then(() => {
                const token = $liff.getIDToken();
                setUserToken(token)

                const profileData = $liff.getDecodedIDToken()
                setUserName(profileData?.name?.toString() || null)

                endLoading()

                router.push('/top')
            })
            .catch((error: any) => {
                console.error(error);
                endLoading()
                // this.showButton = true;
            });
    } else {
        endLoading()
        router.push('/top')
    }

})
</script>

<style lang="scss" scoped>
.home {
    padding: 5rem 2rem;
    text-align: center;
    background-color: rgb(70, 53, 106);
    background-image: url(/images/bg.jpg);
    background-repeat: repeat-y;
    background-size: 100% auto;
    min-height: 100vh;
}

.top-text {
    font-size: 16px;
    color: #efb94b;
    padding: 2em 0;
    line-height: 1.7em;
}

.home__buttons__button {
    min-width: 250px;
    cursor: pointer;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 0.9375rem;
    line-height: 1.5;
    border-radius: 2px;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.button--primary {
    color: #fff;
    background-color: #06C755;
    display: flex;
    width: 250px;
    margin: 0 auto;
    align-items: center;
    position: relative;
    border-radius: 10px;

    &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 1;
        display: block;
    }

    &:hover {
        &::before {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    &:active {
        &::before {
            background-color: rgba(0, 0, 0, 0.3);
        }
    }

    .line-login-image {
        width: 50px;
        height: 50px;
        background-image: url(@/assets/images/line_132.png);
        background-size: contain;
        border-right: 1px solid rgba(0, 0, 0, 0.08);
        position: relative;
        z-index: 2;
    }

    .line-login-text {
        flex: 1;
        text-align: center;
        padding: 0 40px;
        z-index: 3;
    }
}

.button--primary:hover {
    color: #fff;
    background-color: #06C755;
    border-color: #06C755;
}

@media screen and (max-width: 600px) {
    html {
        font-size: 12px;
    }
}
</style>