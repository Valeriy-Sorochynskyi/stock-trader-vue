<template>
  <div class="login">
    <el-card>
      <h2 class="login__heading">Login</h2>
      <el-form
        class="login__form"
        :model="form"
        :rules="rules"
        ref="form"
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
            class="login__button"
            type="success"
            block
            @click="onSubmit()"
          >Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
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
          {
            required: true,
            message: 'Password is required',
            trigger: 'blur'
          },
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
    ...mapActions(['login']),
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const loginForm = {
            email: this.form.email,
            password: this.form.password
          }

          this.login({
            email: loginForm.email,
            password: loginForm.password
          })
            .then(() => {
              this.$router.push('/')
            })
            .catch(error => {
              this.$notify.error({
                title: `Error ${error.response.status}`,
                message: error.response.data.error.message,
                duration: 3000
              })
            })
        } else {
          return false
        }
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

  &__button {
    width: 100%;
    margin-top: 40px;
  }

  &__form {
    width: 290px;
  }

  &__heading {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
