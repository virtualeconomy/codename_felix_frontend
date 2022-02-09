<template>
  <div>
    <i
        class="el-icon-arrow-left"
        @click="$router.go(-1)"
        style="color:#FB8809;font-size:20px;font-weight:600;cursor:pointer"
    >back to settings</i>
    <h3>List of transactions ID</h3>
  </div>
</template>

<script>
export default {
  name: "TransId",
  data() {
    return {
    };
  },
  methods: {},
  mounted() {
  }
};
</script>

<style scoped>
</style>