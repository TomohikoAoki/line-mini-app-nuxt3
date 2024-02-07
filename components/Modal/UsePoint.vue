<template>
    <div class="content">
        <h2 class="modal-title">ポイントを使用する</h2>
        <p class="first-text">
            現在の保有ポイント: {{ propsData.point }}
        </p>
        <div class="use-point-main">
            <Transition name="fade">
                <form class="form" v-if="!confirmFlag">
                    <div class="form-group">
                        <label class="form-label">利用ポイント入力</label>
                        <div class="form-content">
                            <input class="input-text" v-model="formData.point" type="text" inputmode="numeric"
                                @blur="fieldValidation('point')"
                                :class="{ valid: validation.point, invalid: validation.point === false }">
                            <div class="error"><span v-if="validation.point === false">{{
                                validationMessage.point[messageNumber.point] }}</span>
                            </div>
                        </div>
                    </div>
                    <button @click.prevent="confirm" class="form-btn" :disabled="!validation.point"
                        :class="{ disable: !validation.point }">
                        確認
                    </button>
                </form>
                <div v-else class="confirm">
                    <div class="confirm-text-area">
                        <p><span>{{ formData.point }}&nbsp;point</span><br>を利用します。</p>
                        <p>よろしいですか？</p>
                    </div>
                    <div class="confirm-btn-area">
                        <button @click.prevent="usePoint" class="btn2 connect">
                            送信
                        </button>
                        <button @click.prevent="correction" class="btn2 correction">
                            修正
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup>

const formData = ref({
    point: null
})
const validation = ref({
    point: null,
})
const validationMessage = ref({
    point: ['必ず入力してください。', '半角数字で整数を入力してください。', '利用できるポイントを超えています'],
})
const messageNumber = ref({
    point: null,
})
const confirmFlag = ref(false)

const props = defineProps({
    propsData: {
        type: Object,
        require: true,
    }
})

const emits = defineEmits(['usePoint', 'close'])

const usePoint = () => {
    emits('usePoint', formData.value.point)
}

const confirm = () => {
    confirmFlag.value = true
}

const correction = () => {
    confirmFlag.value = false
}

const fieldValidation = (field) => {
    // validationの形式
    const rgx = {
        point: "\^[1-9][0-9]*$"
    }

    // 空の場合
    if (formData.value[field] === '') {
        messageNumber.value[field] = 0
        validation.value[field] = false
        return
    }
    // 使用ポイントがtotalPointを超えた場合
    if (props.propsData.point < formData.value[field]) {
        messageNumber.value[field] = 2
        validation.value[field] = false
        return
    }
    // mail 正規表現を合わない場合
    const rgxObj = new RegExp(rgx[field])
    validation.value[field] = rgxObj.test(formData.value[field])

    messageNumber.value[field] = validation.value[field] ? null : 1
}


</script>

<style lang="scss" scoped>
.content {
    height: 300px;
}

.modal-title {
    font-weight: bold;
    text-align: center;
    padding: 0 0 1em 0;
}

.first-text {
    width: 95%;
    margin: 0 auto 0.5em auto;
    font-size: 1.1em;
    text-align: center;
}

.use-point-main {
    position: relative;
}

.form {
    display: block;
    width: 90%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

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

    .form-btn {
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
}

.confirm {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .confirm-text-area {
        text-align: center;

        p {
            span {
                font-weight: bold;
                font-size: 1.3em;
            }
        }

        p:last-child {
            padding: 1em 0;
        }
    }

    .confirm-btn-area {
        display: flex;
        justify-content: space-around;
        width: 100%;
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

.btn2 {
    width: 100px;
    margin: 0 auto;
    padding: 0.8em 0;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.5em;
    text-align: center;
    text-indent: 0.5em;

    &.connect {
        background-color: #854b4b;
    }

    &.correction {
        background-color: #4b6385;

    }
}

.close-area {
    position: absolute;
    bottom: 2em;
    width: 150px;
    left: 50%;
    transform: translateX(-50%);

}
</style>
