<template>
    <div class="tabbar-container">
        <!-- 子路由出口 -->
        <router-view></router-view>
        <!-- /子路由出口 -->

        <!-- tab-bar 标签栏 -->
        <van-tabbar route>
            <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
            <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item
            icon="user-o"
            to="/my"
            >{{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item>
        </van-tabbar>
        <!-- / tab-bar 标签栏 -->
    </div>
</template>

<script>
export default {
  name: 'TabBar',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {}
}
</script>

<style>

</style>
