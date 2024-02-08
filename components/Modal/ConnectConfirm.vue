<template>
    <div class="content">
        <h2 class="modal-title">ハートフル会員に連携して<br>ポイントを合算する</h2>
        <p class="first-text">
            ハートフルポイントをすでにお持ちの方でこれまで貯めていたポイントと合算してポイントを貯めたい方はID連携してください。<br>
            初めてご利用の方は会員登録なしでLINE内でハートフルポイントを貯めることができます。
        </p>
        <p class="first-text__note">※LINE内で貯めたハートフルポイントを会員連携で合算することはできませんのでご注意ください。</p>
        <p class="first-text__note">※受付予約の前に会員連携をしていただかないとポイントは付与されません。</p>
        <form class="form">
            <div class="form-group">
                <label class="form-label">メールアドレス</label>
                <div class="form-content">
                    <input class="input-text" v-model="formData.usrmail" type="email" @blur="fieldValidation('usrmail')"
                        :class="{ valid: validation.usrmail, invalid: validation.usrmail === false }">
                    <div class="error"><span v-if="validation.usrmail === false">{{
                        validationMessage.usrmail[messageNumber.usrmail] }}</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">パスワード</label>
                <div class="form-content">
                    <input class="input-text" v-model="formData.password" type="password"
                        @blur="fieldValidation('password')"
                        :class="{ valid: validation.password, invalid: validation.password === false }">
                </div>
                <div class="error"><span v-if="validation.password === false">{{
                    validationMessage.password[messageNumber.password] }}</span></div>
            </div>
            <button @click.prevent="connect" class="btn" :disabled="!validation.usrmail || !validation.password"
                :class="{ disable: !validation.usrmail || !validation.password }">
                確認
            </button>
        </form>
        <div class="close-area">
            <p class="close-area__text">会員登録なしでLINE内でハートフルポイントを貯める場合は閉じるを押してください。</p>
        </div>
    </div>
</template>

<script setup>
const { startLoading, endLoading } = useLoading()
const { setUserPoint } = useUser()
const { setFlashMessage } = useFlashMessage()
const { closeModal } = useModal()
const { getUserToken } = useUser()

// formとvalidation関係
/**
 * @description formの値
 * @type {Object}
 * @property {string} usrmail - メールアドレス
 * @property {string} password - パスワード
 */
const formData = ref({
    usrmail: '',
    password: '',
})
/**
 * @description バリデーションの結果
 * @type {Object}
 * @property {boolean} usrmail - メールアドレスのバリデーションの結果
 * @property {boolean} password - パスワードのバリデーションの結果
 */
const validation = ref({
    usrmail: null,
    password: null,
})

/**
 * @description バリデーションのエラーメッセージ
 * @type {Object}
 * @property {Array} usrmail - メールアドレスのバリデーションのエラーメッセージ
 * @property {Array} password - パスワードのバリデーションのエラーメッセージ
 */
const validationMessage = ref({
    usrmail: ['必ず入力してください。', 'メールアドレスの形式が違います'],
    password: ['必ず入力してください。', '半角英数字で入力してください。']
})

/**
 * @description validationMessageに格納しているエラーメッセージから、表示するエラーメッセージのindexを格納
 * @type {Object}
 * @property {number} usrmail - メールアドレスのバリデーションのエラーメッセージナンバー
 * @property {number} password - パスワードのバリデーションのエラーメッセージナンバー
 */
const messageNumber = ref({
    usrmail: null,
    password: null
})

/**
 * @description フィールドのバリデーション
 * @param {string} field - バリデーションを行うフィールド
 * @example fieldValidation('usrmail')
 * @todo バリデーションの結果によって、バリデーションの結果とエラの場合は表示するエラーメッセージナンバーを格納
 * 
 */
const fieldValidation = (field) => {
    // validationの形式
    const rgx = {
        usrmail: "\^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$",
        password: "\^[0-9a-zA-Z]*$"
    }

    // 空の場合
    if (formData.value[field] === '') {
        messageNumber.value[field] = 0
        validation.value[field] = false
        return
    }
    // mail 正規表現を合わない場合
    const rgxObj = new RegExp(rgx[field])
    validation.value[field] = rgxObj.test(formData.value[field])

    messageNumber.value[field] = validation.value[field] ? null : 1
}

/**
 * @function connect
 * @description 会員情報との紐づけ/submit handler
 * @returns {void}
 * @see　{formData} formの値を使用
 * @todo メールアドレスとパスワード、LineTokenを使ってapiを叩いて、ユーザーのポイントとIDを取得
 * @todo 紐づけが完了した場合、userStateにポイントとユーザーIDを格納: ポイントが加算されましたを表示
 * @todo 紐づけができなかった場合、エラーメッセージを表示: ネットワークエラー or 紐づけ情報がない
 */
const connect = async () => {
    startLoading()
    // call api
    // formの値を使用
    // ユーザーpointとIDを取得
    const { data: res, error } = await useFetch(`https://uranai.heartf.com/Public/epoints/linkmember/?usrmail=${formData.value.usrmail}&password=${formData.value.password}&id_token=${getUserToken()}`)

    if (!error.value) {
        // 返ってきたポイントとユーザーIDとかあればuserStateに格納
        // 紐づけ完了のメッセージを表示
        // モーダルを閉じる
        setUserPoint(res.value.point)
        setFlashMessage('会員情報との紐づけができました。')
        endLoading()
        return
    }

    // 通信エラー or 紐づけができなかった場合
    // エラーメッセージを表示
    // モーダルを閉じる
    setFlashMessage('ネットワークエラー or 紐づけ情報がない')
    closeModal()
    endLoading()



    // テスト用
    console.log(res.value, "responseの値")
    console.log(error.value, "errorの値")
}
</script>

<style lang="scss" scoped>
.modal-title {
    font-weight: bold;
    text-align: center;
    padding: 0 0 1em 0;
}


.first-text {
    line-height: 1.5em;
    width: 95%;
    margin: 0 auto 0.5em auto;
    font-size: 0.9em;
}

.first-text__note {
    font-size: 0.8em;
    padding: 0.3em 0;
}



.form {
    width: 90%;
    margin: 0 auto;

    .form-group {
        margin: 0.5em 0 0.5em 0;

        .form-label {
            font-weight: bold;
            font-size: 0.9em;
        }

        .form-content {
            padding-top: 0.3em;

            .input-text {
                display: block;
                border: 1px solid #b7b7b7;
                width: 100%;
                height: 3em;
                padding: 0 1em;
                border-radius: 10px;

                &.valid {
                    border-color: rgb(16, 138, 97);
                }

                &.invalid {
                    border-color: rgb(138, 61, 16);
                }
            }
        }
    }

    .btn {
        margin: 0 auto;
    }


}

.error {
    font-size: 0.8em;
    padding-top: 0.1em;
    height: 1em;

    span {
        color: brown;
    }
}

.btn {
    width: 100px;
    margin: 0 auto;
    padding: 1.0em 0;
    background-color: #854b4b;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.5em;
    text-align: center;
    text-indent: 0.5em;

    &.disable {
        opacity: 0.2;
    }
}

.close-area {
    padding-top: 2em;

    .close-area__text {
        text-align: center;
        padding-bottom: 1em;
        font-size: 0.9em;
    }

}
</style>