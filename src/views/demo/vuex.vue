<template>
    <div>
      <p>click {{$store.state.count}} times, count is {{evenOrOdd}}</p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementIfOdd">increment if odd</button>
      <button @click="incrementAsync">increment async</button>
    </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      evenOrOdd() {
        return this.$store.getters.evenOrOdd
      }
    },
    methods: {
      increment() {
        // dispatch触发对应action调用
        this.$store.dispatch('increment')
      },
      decrement() {
        this.$store.dispatch('decrement')
      },
      incrementIfOdd() {
        this.$store.dispatch('incrementIfOdd')
      },
      // 过1s再增加
      incrementAsync() {
        this.$store.dispatch('incrementAsync')
      }
    }

  }
</script>

<style scoped>

</style>
