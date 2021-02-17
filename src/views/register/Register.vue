<template>
  <div class="wrapper">
    <img class="wrapper__img" src='http://www.dell-lee.com/imgs/vue3/user.png' />
    <div class="wrapper__input">
      <input
        type="text"
        placeholder="用户名"
        class="wrapper__input__content"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        placeholder="请输入密码"
        class="wrapper__input__content"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        placeholder="重新输入密码"
        class="wrapper__input__content"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">去登录</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

const useRegisterEffect = () => {
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handleRegister = async () => {
    try {
      const result = await instance.post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      console.log(result)
    } catch (e) {
      alert('请求失败')
    }
  }

  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}
export default {
  name: 'Register',
  setup () {
    const { username, password, ensurement, handleRegister } = useRegisterEffect()
    const { handleLoginClick } = useLoginEffect()
    return {
      username, password, ensurement, handleRegister, handleLoginClick
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
      display: block;
      width: .66rem;
      height: .66rem;
      margin: 0 auto .4rem auto;
    }
    &__input {
      height: .48rem;
      margin: 0 .4rem .16rem .4rem;
      padding: 0 .16rem;
      background-color: #F9F9F9;
      border: .01rem solid rgba(0, 0, 0, .1);
      border-radius: .06rem;
      &__content {
        width: 100%;
        margin-top: .12rem;
        line-height: .22rem;
        outline: none;
        border: none;
        background: none;
        font-size: .16rem;
      }
    }
    &__register-button {
      margin: .32rem .4rem .16rem .4rem;
      line-height: .48rem;
      background-color: #1FA4FC;
      color: white;
      font-size: .16rem;
      border-radius: .06rem;
      text-align: center;
      box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
    }
    &__register-link {
      font-size: .14rem;
      color: #777777;
      text-align: center;
    }
  }
</style>
