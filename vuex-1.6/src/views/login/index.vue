<template>
    <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录"/>
      <!-- 登陆表单 开始 -->
      <van-cell-group>
        <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        />
          <i class=" icon icon-shouji" slot="left-icon"></i>
        <van-field
          v-model="user.code"
          label="验证码"
          placeholder="请输入验证码"
          required
        >
        <i class=" icon icon-mima" slot="left-icon"></i>
        <van-count-down
         v-if = "isCountDownShow"
          slot = "button"
          :time = "1000*60"
          format = "ss s"
          @finish = "isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            size="small"
            type="primary"
            round
            @click="onSendSmsCode">
            发送验证码
          </van-button>
        </van-field>

      </van-cell-group>
      <div class="btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>
      </div>
    </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
// import { async } from 'q'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 表单验证通过
      this.$toast.loading({
        duration: 0, // 持续展示toast
        message: '登录中。。。',
        forbidClick: true // 是否禁止背景点击
      })
      // 3、请求提交
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登陆失败', err)
        this.$toast.fail('登陆失败')
      }
      // 4、根据接口返回数据返回执行结果后续处理
    },
    async onSendSmsCode () {
      // 1、获取手机号
      const { mobile } = this.user
      // 2、校验手机号是否有效

      // 3、发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true
        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)
        // this.$toast('发送失败')
        // 发送失败 关闭倒计时
        this.isCountDownShow = false

        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        // 发送失败 关闭倒计时
        // this.isCountDownShow = false
        this.$toast('发送失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
  .btn-wrap {
    padding: 27px 16px;
    .van-button{
      width: 100%;
    }
  }

</style>
