<template>
    <div class="app-main">
        <div class="point-area">
            <div>
                <div>
                    <SvgBase icon-name="display-point-top" viewBox="0 0 258.5 65.5" iconColor="#efb94b"
                        iconTitle="ハートフルポイント">
                        <SvgDataDisplayPointTop></SvgDataDisplayPointTop>
                    </SvgBase>
                </div>
                <div class="point-content">
                    <p class="current-point">現在のポイント:</p>
                    <p class="point-display"><span class="point">{{ getUserPoint() }}</span><span class="pt">pt</span></p>
                </div>
                <div>
                    <SvgBase icon-name="display-point-bottom" viewBox="0 0 258.5 35" iconColor="#efb94b"
                        iconTitle="ハートフルポイントボトム">
                        <SvgDataDisplayPointBottom></SvgDataDisplayPointBottom>
                    </SvgBase>
                </div>
            </div>
        </div>
        <div class="navi">
            <div class="navi-item" @click="addPoint">
                <div class="navi-item__icon">
                    <SvgBase icon-name="icon-navi-add" viewBox="0 0 237 320.8" iconColor="#efb94b" iconTitle="ポイントを貯める">
                        <SvgDataIconNaviAdd></SvgDataIconNaviAdd>
                    </SvgBase>
                </div>
                <p class="navi-item__text">ポイントを<br>貯める</p>
            </div>
            <div class="navi-item" @click="openModal(1)">
                <div class="navi-item__icon">
                    <SvgBase icon-name="icon-navi-add" viewBox="0 0 237 320.8" iconColor="#efb94b" iconTitle="ポイントを貯める">
                        <SvgDataIconNaviUse></SvgDataIconNaviUse>
                    </SvgBase>
                </div>
                <p class="navi-item__text">ポイントを<br>使う</p>
            </div>
        </div>
        <nav class="link">
            <ul class="link__list">
                <li class="link__list_item"><span class="item_container" @click="openModal(0)">会員連携</span></li>
                <li class="link__list_item"><nuxt-link to="/terms" class="item_container">利用規約</nuxt-link></li>
                <li class="link__list_item"><nuxt-link to="/privacy" class="item_container">プライバシーポリシー</nuxt-link></li>
            </ul>
        </nav>
        <ModalBase></ModalBase>
        <div class="test">
            <p><span class="labeel">response</span><br> {{ response }}</p>
            <p><span class="labeel">err</span><br>{{ err }}</p>
            <p><span class="labeel">query</span><br>{{ query }}</p>
            <p><span class="labeel">test</span><br>{{ test }}</p>
        </div>

    </div>
</template>

<script setup>

const { $liff } = useNuxtApp()
const loading = useState('loading')
const firstContacted = useState('firstContact')
const { userState, getUserToken, getUserPoint } = useUser()

const { openModal } = useModal()
const { setFlashMessage } = useFlashMessage()


//　テスト用
const response = ref(null)
const test = ref(null)
const err = ref(null)
const query = ref(null)


const closeMessage = () => {
    message.value = null
}


// LineIDが登録されている場合、
// point取得
const connectMemberByLineToken = async () => {
    loading.value = true
    const { data, error, pending } = await useFetch(`https://sysf.heartful.work/epoints/verifyLineToken/?id_token=${getUserToken()}`)
    loading.value = pending.value

    if (!error.value) {
        response.value = data
        setFlashMessage('会員情報との紐づけができました。')
        userState.value.point = 100
        loading.value = false

        return
    }

    err.value = error.value
    setFlashMessage('ネットワークエラー or 紐づけ情報がない')
    loading.value = false

    openModal(0)

}

onMounted(() => {
    if (!firstContacted.value) {
        connectMemberByLineToken()
        firstContacted.value = true
    }
})



const addPoint = async () => {
    loading.value = true
    $liff.scanCodeV2()
        .then(async (result) => {
            if (result.value !== null) {
                // add point api
                console.log(result.value)
                const { data, error } = await useFetch(`https://sysf.heartful.work/epoints/add/${result.value}`)

                if (!error.value) {
                    point.value = data.totalPoints
                    setFlashMessage('ポイントが加算されました')
                    loading.value = false
                    return
                }
                loading.value = false
                setFlashMessage('通信エラーが発生しました')
                return
            }
            setFlashMessage('QRコードの形式が違います')
            loading.value = false
        }).catch((err) => {
            err.value = err
            setFlashMessage('QRコードが正常に読み込まれませんでした')
            loading.value = false
        });
}

const usePoint = async (point) => {
    usePointModalFlag.value = false
    console.log(point, 'ポイントを使ったつもり')
    // $liff.scanCodeV2()
    //     .then( async (result) => {
    //         if (result.value != null) {
    //             var val = JSON.parse(result.value);
    //             // 【code_id】修正予定
    //             const ekanteisId = val['code_id'];

    //             // totalpoints = axiosGet('use/'+ ekanteisId + '/' + point);
    //             const {data,error} = await useFetch(`https://sysf.heartful.work/epoints/use/100/${point}`)

    //             if (!error.value) {
    //                 point.value = data.totalPoints
    //                 message.value = 'ポイントが使用しました。'
    //                 loading.value = false
    //                 return
    //             }

    //             message.value = '通信でエラーが発生。'
    //         }
    //         message.value = 'QRコードの形式が違います'
    //     })
    //     .catch((error) => {
    //         message.value = 'QRコードが正常に読み込まれませんでした'
    //         console.log(error)
    //     });
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=swap');

$baseColor : #efb94b;

.app-main {
    background-color: rgb(70, 53, 106);
    background-image: url(/images/bg.jpg);
    background-repeat: repeat-y;
    background-size: 100% auto;
    position: relative;
    width: 100%;
}



.point-area {
    width: 90%;
    margin: 0 auto;
    padding: 50px 10px;
    border-radius: 10px;
}

.point-content {
    padding: 3em;
    text-align: center;

    .current-point {
        color: $baseColor;
    }

    .point-display {
        .point {
            font-family: 'Amiri', serif;
            color: $baseColor;
            font-weight: bold;
            font-size: 3em;
        }

        .pt {
            font-family: 'Amiri', serif;
            color: $baseColor;
            font-weight: bold;
            font-size: 1.3em;
        }
    }
}


.navi {
    display: flex;
    justify-content: center;

    .navi-item {
        width: 150px;
        padding: 25px 0 20px 0;
        text-align: center;
        border: 1px solid $baseColor;
        color: #fff;
        font-weight: bold;
        border-radius: 10px;
        margin: 0 0.4em;
        position: relative;

        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: $baseColor;
            opacity: 0.05;
        }

        .navi-item__icon {
            width: 45%;
            margin: 0 auto;
        }

        .navi-item__text {
            padding-top: 1em;
            font-size: 0.9em;
            color: $baseColor;
        }
    }
}

.link {
    width: 85%;
    margin: 0 auto;
    color: #efb94b;
    padding-top: 30px;
    padding-bottom: 70px;

    .link__list {
        border-top: 1px solid $baseColor;
        border-bottom: 1px solid $baseColor;

        .link__list_item {
            border-bottom: 1px dotted;

            &:last-child {
                border-bottom: none;
            }

            .item_container {
                display: block;
                width: 100%;
                height: 100%;
                padding: 1em 1em 1em 2.2em;
                background-image: url(/images/icon-link.svg);
                background-position: left 0.5em center;
                background-size: auto 45%;
                background-repeat: no-repeat;


                &:hover {
                    filter: brightness(120%);
                    background-color: blueviolet;
                }
            }
        }
    }
}



.test {
    width: 100%;
    margin: 0 auto;
    overflow-wrap: break-word;
    background-color: #000000;
    color: #fff;
}

.labeel {
    display: inline-block;
    padding: 0.5em;
    background-color: rgb(69, 36, 36);
    color: #fff;
}
</style>