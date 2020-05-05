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
        <!-- <el-form-item prop="confirm">
          <el-input
            v-model="form.confirm"
            placeholder="Confirm"
            type="password"
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button
            class="signup__button"
            type="success"
            block
            @click="signUp('form')"
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
        email: '',
        password: ''
        // confirm: '',
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
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 5,
            message: 'Password length should be at least 5 characters',
            trigger: 'blur'
          }
        ]

        // confirm: [
        //   { required: true, message: 'Confirm is required', trigger: 'blur' },
        //   {
        //     min: 5,
        //     message: 'Confirm length should be at least 5 characters',
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },

  methods: {
    signUp (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            confirm: this.form.confirm
          }

          this.$store.dispatch('signup', {
            email: formData.email,
            password: formData.password
          })
        } else {
          alert('Error submit!')
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
