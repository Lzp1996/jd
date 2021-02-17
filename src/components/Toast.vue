<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  props: ['message']
}

export const useToastEffect = () => {
  const data = reactive({ show: false, toastMessage: '' })
  const showToast = (message) => {
    data.show = true
    data.toastMessage = message
    setTimeout(() => {
      data.show = false
      data.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(data)
  return { show, toastMessage, showToast }
}
</script>

<style lang="scss" scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: .1rem;
    background-color: rgba(0, 0, 0, .4);
    color: white;
  }
</style>
