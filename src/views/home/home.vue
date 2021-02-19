<template>
  <div>
    <div class="wrapper">
      <static-part></static-part>
      <nearby></nearby>
    </div>
    <Docker></Docker>
  </div>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from '../../Docker'
export default {
  name: 'home',
  components: { Docker, Nearby, StaticPart }
}
</script>

<style lang="scss">
  .wrapper {
    position: absolute;
    overflow-y: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: .5rem;
    padding: 0 .18rem .2rem;
  }
</style>
