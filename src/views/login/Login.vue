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
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <toast v-if="show" :message="toastMessage"></toast>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = (showToast) => {
  const data = reactive({ username: '', password: '' })
  const router = useRouter()
  const handleLogin = async () => {
    const result = await post('/api/user/login', {
      username: data.username,
      password: data.password
    })
    if (result && result.errno === 0) {
      localStorage.isLogin = true
      router.push({ name: 'home' })
    } else {
      showToast('错误数据')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()
    return {
      username,
      password,
      handleLogin,
      handleRegisterClick,
      show,
      toastMessage
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
    &__login-button {
      margin: .32rem .4rem .16rem .4rem;
      line-height: .48rem;
      background-color: #1FA4FC;
      color: white;
      font-size: .16rem;
      border-radius: .06rem;
      text-align: center;
      box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
    }
    &__login-link {
      font-size: .14rem;
      color: #777777;
      text-align: center;
    }
  }
</style>
