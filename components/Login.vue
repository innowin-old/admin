<template>
  <v-card flat>
    <v-toolbar dark flat extended class="login-toolbar" style="background: #424242">
      <div class="headline">برای ادامه کار بایست نام کاربری و رمز عبور را وارد نمایید</div>
      <!--v-toolbar-side-icon></v-toolbar-side-icon-->
    </v-toolbar>
    <v-layout row pb-2>
      <v-flex xs4 offset-xs4>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text" >{{ signup ? 'عضویت' : 'ورود' }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form v-if="!signup" v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="نام کاربری / ایمیل "
                v-model="username"
                hint="لطفا برای ورود نام کاربری یا ایمیل خود را وارد نمایید"
                :rules="usernameRules"
                :counter="20"
                required
                ref="username"
              ></v-text-field>

              <v-text-field
                label="رمز عبور "
                v-model="password"
                :rules="passwordRules"
                hint="رمز عبور به حروف کوچک و بزرگ حساس است"
                min="8"
                :append-icon="e3 ? 'visibility_off' : 'visibility'"
                @click:append="() => (e3 = !e3)"
                type="password"
                class="input-group--focused"
                :type="e3 ? 'password' : 'text'"
                required
              ></v-text-field>

              <!--v-checkbox
                label="مرا به یاد آور"
                v-model="checkbox"
              ></v-checkbox-->

              <div class="buttons-content mt-3">

                <v-btn
                  @click="goSignup"
                  color="primary"
                  flat
                >
                  ثبت نام در سیستم
                </v-btn>

                <br />

                <v-btn
                  @click="submit"
                  color="green"
                  dark
                >
                  ورود
                </v-btn>

              </div>
            </v-form>
            <v-form v-else >
              <v-text-field
                label="نام کاربری / ایمیل "
                v-model="username"
                hint="لطفا برای ورود نام کاربری یا ایمیل خود را وارد نمایید"
                :rules="usernameRules"
                :counter="20"
                required
                ref="username"
              ></v-text-field>

              <v-text-field
                label="نام "
                v-model="firstName"
                :rules="firstNameRules"
                :counter="20"
                required
                dir="rtl"
              ></v-text-field>

              <v-text-field
                label="نام خانوادگی "
                v-model="lastName"
                :rules="lastNameRules"
                :counter="50"
                required
                dir="rtl"
              ></v-text-field>

              <v-text-field
                label="رمز عبور "
                v-model="password"
                :rules="passwordRules"
                hint="رمز عبور به حروف کوچک و بزرگ حساس است"
                min="8"
                :append-icon="e3 ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (e3 = !e3)"
                type="password"
                class="input-group--focused"
                :type="e3 ? 'password' : 'text'"
                required
              ></v-text-field>

              <div class="buttons-content mt-3">

                <v-btn
                  @click="goLogin"
                  color="primary"
                  flat
                >
                  قبلا ثبت نام کرده ام
                </v-btn>

                <br />

                <v-btn
                  v-on:click="signupProcess"
                  color="pink"
                  dark
                >
                  ثبت نام
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        usernameRules: [
          (v) => !!v || 'وارد کردن نام کاربری الزامی است'
        ],
        firstName: '',
        firstNameRules: [
          (v) => !!v || 'وارد کردن نام برای عضویت الزامی است'
        ],
        lastName: '',
        lastNameRules: [
          (v) => !!v || 'وارد کردن نام خانوادگی برای عضویت الزامی است'
        ],
        password: '',
        passwordRules: [
          (v) => !!v || 'وارد کردن رمز عبور الزامی است'
        ],
        e3: true,
        checkbox: true,
        valid: false,
        signup: false
      }
    },
    methods: {
      submit: function (value) {
        this.$app.authenticate({
          strategy: 'local',
          username: this.username,
          password: this.password
        }).then(() => {
          // Logged in
          console.log(window.localStorage.getItem('feathers-jwt'))
          location.reload()
          // this.$store.commit('setToken', data.accessToken)
        }).catch(e => {
          // Show login page (potentially with `e.message`)
          console.error('Authentication error', e)
        })
      },
      goSignup: function (value) {
        this.signup = true
      },
      goLogin: function (value) {
        this.signup = false
      }
    },
    mounted: function () {
      this.$refs.username.focus()
      console.log('token', this.$store.state.token)
    }
  }
</script>

<style scoped>
  * {
    direction: ltr;
  }
  .headline {
    font-size: 17px !important;
    width: 100% !important;
    text-align: center;
  }
  .card--flat{
    height: 100vh !important;
  }
  .card--flex-toolbar {
    margin-top: -64px;
  }
  .buttons-content {
    text-align: center;
    direction: rtl;
  }
  .layout.row {
    background-color: rgb(48, 48, 48);
  }
</style>

<style>
  .login-toolbar>.toolbar__content {
    height: 128px !important;
  }
  .theme--dark .toolbar, .application .theme--dark.toolbar {
    box-shadow: none;
  }
  .input-group__messages {
    font-size: 10px !important;
  }
  .toolbar__content {
    direction: rtl!important;
  }
  .toolbar__content > *:not(.btn):not(.menu):first-child:not(:only-child), .toolbar__extension > *:not(.btn):not(.menu):first-child:not(:only-child) {
    margin-right: 16px;
    margin-left: 0px;
  }
  .input-group label {
    font-size: 14px;
  }
  .input-group--text-field input, .input-group--text-field textarea {
    font-size: 14px;
  }
</style>
