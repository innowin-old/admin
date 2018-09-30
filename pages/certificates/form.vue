<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-flex xs6>
          <v-form v-model="valid" ref="form" lazy-validation>

            <v-text-field
              label='عنوان'
              v-model='model.title'
              :rules='titleRules'
              :counter='100'
              required
            ></v-text-field>

            <v-select
              label='کاربر'
              v-model='model.certificate_user'
              :rules='certificateUserRules'
              :items="usersItems"
              :clearable=true
            ></v-select>

            <v-select
              label='شرکت'
              v-model='model.certificate_organization'
              :rules='certificateOrganizationRules'
              :items="organizationsItems"
              :clearable=true
            ></v-select>

            <v-select
              label='عکس'
              v-model='model.picture_media'
              :rules='pictureMediaRules'
              :items="pictureMediaItems"
              :clearable=true
            ></v-select>

            <v-checkbox
              label='Active Flag'
              v-model='model.active_flag'
            ></v-checkbox>

            <v-btn
              @click="submit"
              :disabled="!valid"
            >
              submit
            </v-btn>

          </v-form>

        </v-flex>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      title: 'New Certificate',
      valid: true,
      id: null,
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 100) || 'Title must be less than 100 characters'
      ],
      certificateUserRules: [],
      certificateOrganizationRules: [],
      pictureMediaRules: [],
      activeFlag: null,
      received: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          var instance = this.model

          try {
            instance.certificate_user = this.$store.state.users.list.find(a => a.username === this.model.certificate_user)._id
          } catch (e) {
            instance.certificate_user = null
          }
          try {
            instance.certificate_organization = this.$store.state.organizations.list.find(a => a.username === this.model.certificate_organization)._id
          } catch (e) {
            instance.certificate_organization = null
          }

          var certificates = this.$app.service('certificates')
          console.log(instance)
          if (this.getParameterByName('id') != null) {
            this.$app.service('certificates').update(this.id, instance)
            this.$router.push('/certificates')
          } else {
            certificates.create(instance)
            this.$router.push('/certificates')
          }
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      getParameterByName (name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\]]/g, '\\$&')
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
        var results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
      }
    },
    computed: {
      model () {
        if (this.getParameterByName('id') != null && this.done) {
          this.id = this.getParameterByName('id')
          var instance = this.$store.state.certificates.list.find(instance => instance._id === this.id)
          try {
            instance.certificate_user = this.$store.state.users.list.find(a => a._id === instance.certificate_user).username
          } catch (e) {}

          try {
            instance.certificate_organization = this.$store.state.organizations.list.find(a => a._id === instance.certificate_organization).username
          } catch (e) {}

          return instance
        } else {
          return {}
        }
      },
      usersItems () {
        if (this.$store.state.users.done) {
          return this.$store.state.users.list.map(a => a.username)
        } else {
          return []
        }
      },
      organizationsItems () {
        if (this.$store.state.organizations.done) {
          return this.$store.state.organizations.list.map(a => a.username)
        } else {
          return []
        }
      },
      pictureMediaItems () {
        return []
      },
      done () {
        return this.$store.state.certificates.done
      }
    },
    mounted: function () {
      this.$store.commit('setTitle', this.title)
    }
  }
</script>
