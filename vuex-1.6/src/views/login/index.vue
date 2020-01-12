<template>
    <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录"/>
      <!-- 登陆表单 开始 -->
        <!-- vee-validate 验证插件的具体使用
        1、使用ValidationObserver 把需要校验的整个表单包起来
        2、使用ValidationProvider 把需要校验的具体表单元素包起来，例如：input
        3、通过 ValidationProvider 配置具体的校验规则
        name 配置验证字段的名称
        rules 验证规则
        rules="requried"单个验证规则
        rules="required|length:4" 多个验证规则使用 | 分隔
        v-slot="{ errors }" 获取错误消息
         -->

      <ValidationObserver ref="form">
        <ValidationProvider name="手机号" rules="required|mobile">
          <van-field
            v-model="user.mobile"
            required
            clearable
            label="手机号"
            placeholder="请输入手机号"
          >
            <i class=" icon icon-shouji" slot="left-icon"></i>
          </van-field>
           <!-- errors[0] 就是获取验证失败的错误消息 -->
          <!-- <span>{{ errors[0] }}</span> -->
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|code">
          <van-field
            v-model="user.code"
            label="验证码"
            placeholder="请输入验证码"
            required>
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
        </ValidationProvider>
      </ValidationObserver>
      <div class="btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>
      </div>
    </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { setTimeout } from 'timers'
import { validate } from 'vee-validate'
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
      const success = await this.$refs.form.validate()
      if (!success) {
        setTimeout(() => {
          // console.log('验证失败', this.$refs.form.errors)
          const errors = this.$refs.form.errors
          // forEach 不能停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定

          // const item = Object.values(errors).find(item => item[0])
          // item ['错误消息']
          // item [0] 错误消息、undefined
          // 如果item[0] 参与布尔运算 true，则是返回该元素，停止遍历
          //
          // return item[0]
          // 找到第一个有错误的字段并弹出提示
          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              return
            }
          }
          // })
          // this.$toast(item[0])
        }, 100)
        return
      }
      // 表单验证通过
      this.$toast.loading({
        duration: 0, // 持续展示toast
        message: '登录中。。。',
        forbidClick: true // 是否禁止背景点击
      })
      // 3、请求提交
      try {
        const res = await login(user)
        // console.log(res)
        // 将登录状态存储到Vuex容器中
        this.$store.commit('setUser', res.data.data)
        // 提示登陆成功
        this.$toast.success('登陆成功')
        // 跳转到首页
        this.$router.push('/')
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
      // 参数1、要验证的数据
      // 参数2、验证规则
      // 参数3、一个可选的配置对象，例如配置错误消息字段名称name
      // 返回值：{valid，errors，。。。}
      // valid：验证是否成功，成功是true，失败是false
      // errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
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
