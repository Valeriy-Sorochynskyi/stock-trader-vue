<template>
  <div class="login">
    <el-card>
      <h2 class="login-heading">Login</h2>
      <el-form
        class="login-form"
        :model="form"
        :rules="rules"
        @submit.native.prevent="login"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="Email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="success"
            native-type="submit"
            block
          >Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },

      loading: false,

      rules: {
        email: [
          {
            required: true,
            message: 'Email is required',
            trigger: 'blur'
          },
          {
            min: 4,
            message: 'Email length should be at least 5 characters',
            trigger: 'blur'
          }
        ],

        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 5,
            message: 'Password length should be at least 5 characters',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    login () {
      const loginForm = {
        email: this.form.email,
        password: this.form.password
      }
      console.log(loginForm)
      this.$store.dispatch('login', {
        email: loginForm.email,
        password: loginForm.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}

.login-form {
  width: 290px;
}

.login-heading {
  text-align: center;
  margin-bottom: 20px;
}
</style>
