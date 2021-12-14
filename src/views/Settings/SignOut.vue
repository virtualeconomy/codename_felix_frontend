<template>
  <div style="display:flex;flex-direction:column;text-align:center;align-items:center">
    <img style="margin-top:30%" src="@/assets/imgs/settings_aboutus.svg" width="40" alt />
    <h2>Sign out of wallet</h2>
    <div
      style="padding:0 40px"
    >Before you sign out of your wallet, please make sure that you have need information to sign in again. Without it, you will use access to to your saved words.</div>
    <div
      style="display: flex;width: 100%;padding: 40px;justify-content: space-around;box-sizing: border-box;"
    >
      <div class="base-button-ui" @click="$router.go(-1)">Cancel</div>
      <div class="base-button-ui" @click="clearStore">Sign Out</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearStore() {
      location.reload()
      // this.$confirm("Are you sure to sign out?", "", {
      //   confirmButtonText: "Yes",
      //   cancelButtonText: "No",
      //   type: "warning"
      // }).then(() => location.reload());
    }
  }
};
</script>

<style scoped>
.base-button-ui {
  border: 1px solid black;
  border-radius: 50px;
  padding: 5px;
  width: 100px;
}
.base-button-ui:hover {
  background: #ff8737;
  color: white;
}
</style>