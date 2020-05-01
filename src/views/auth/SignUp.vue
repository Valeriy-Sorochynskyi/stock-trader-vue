<template>
  <div class="login">
    <el-card>
      <h2 class="login-heading">Sign Up</h2>
      <el-form
        class="login-form"
        :model="form"
        :rules="rules"
        @submit.native.prevent="signUp"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="Username"
          ></el-input>
        </el-form-item>
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
        <el-form-item prop="confirm">
          <el-input
            v-model="form.confirm"
            placeholder="Confirm"
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
          >SignUp</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SignUp',

  data () {
    return {
      form: {
        username: '',
        password: '',
        confirm: '',
        email: ''
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: 'Username is required',
            trigger: 'blur'
          },
          {
            min: 4,
            message: 'Username length should be at least 5 characters',
            trigger: 'blur'
          }
        ],
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
        ],
        confirm: [
          { required: true, message: 'Confirm is required', trigger: 'blur' },
          {
            min: 5,
            message: 'Confirm length should be at least 5 characters',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    signUp () {
      const formData = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        confirm: this.form.confirm
      }
      console.log(formData)
      this.$store.dispatch('signup', {
        email: formData.email,
        password: formData.password
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
