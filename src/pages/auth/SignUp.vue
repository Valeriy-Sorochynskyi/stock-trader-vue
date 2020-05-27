<template>
  <div class="signup">
    <el-card>
      <h2 class="signup__heading">Sign Up</h2>
      <el-form
        class="signup__form"
        :model="form"
        :rules="rules"
        ref="form"
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
        <el-form-item>
          <el-button
            class="signup__button"
            type="success"
            :loading="loading"
            block
            @click="onSubmit()"
          >SignUp</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignUp',

  data () {
    return {
      loading: false,
      form: {
        username: '',
        email: '',
        password: ''
      },
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
    ...mapActions(['signup']),
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          }

          this.loading = true

          this.signup({
            email: formData.email,
            password: formData.password
          })
            .then(() => {
              this.$router.push('/prices')
                .catch(err => err)
            })
            .catch(error => {
              this.$notify.error({
                title: `Error ${error.response.status}`,
                message: error.response.data.error.message,
                duration: 3000
              })
            }).finally(() => { this.loading = false })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.signup {
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
