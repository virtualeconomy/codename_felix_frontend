<template>
  <div class="bottom footer_height">
    <div class="content">
      <div class="logo logo_pc">
        <img src="@/assets/imgs/footer_logo.svg" alt class="logo_img" />
      </div>
      <div class="menu menu_group">
        <ul class="menu_ul menu_group_dynamic">
          <li class="menu_li_first">useful links</li>
          <li class="menu_li">about</li>
          <li @click="$router.push('/docs')" class="menu_li">docs</li>
          <li class="menu_li">code</li>
        </ul>
      </div>
      <div class="menu menu_group">
        <ul class="menu_ul menu_group_dynamic">
          <li class="menu_li_first">connect</li>
          <li class="menu_li">discord</li>
        </ul>
      </div>
      <div class="menu menu_group">
        <ul class="menu_ul menu_group_dynamic">
          <li class="menu_li_first">resources</li>
          <li class="menu_li">analytics</li>
          <li class="menu_li">help center</li>
        </ul>
      </div>
      <div class="menu">
        <div class="logo logo_phone">
          <img src="@/assets/imgs/footer_logo.svg" alt class="logo_img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {},
  data () {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style lang='less' scoped>
@media screen and (max-width: 768px) {
  .logo_phone {
    display: flex !important;
  }
  .logo_pc {
    display: none !important;
  }
  .logo_img {
    width: 122px;
    height: 38px;
  }
  .menu_group_dynamic {
    margin-top: 6px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer_height {
    height: 100%;
  }
}
@media screen and (min-width: 768px) {
  .logo_phone {
    display: none !important;
  }
  .logo_pc {
    display: flex !important;
    margin-left: 32px;
    margin-right: 105px;
  }
  .logo_img {
    width: 194px;
    height: 42px;
  }
  .menu_group_dynamic {
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .footer_height {
    height: 100px;
  }
}
.bottom {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .content {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    .menu {
      flex: 1;
      display: flex;
      justify-content: center;
      .menu_ul {
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        .menu_li_first {
          color: #F08327;
          margin-right: 30px;
          font-size: 15px;
          cursor: pointer;
          white-space: nowrap;
        }
        .menu_li {
          color: #313134;
          margin-right: 40px;
          font-size: 15px;
          cursor: pointer;
          white-space: nowrap;
        }

        .menu_li:hover {
          color: #f08327;
        }
      }
    }
  }
}
</style>
