<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-flex xs6>
          <v-form v-model="valid" ref="form" lazy-validation>

            <v-text-field
              label='Text'
              v-model='model.text'
              :rules='textRules'
              :counter='100'
              required
            ></v-text-field>

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
      title: 'New Badge Category',
      valid: true,
      id: null,
      textRules: [],
      activeFlag: null,
      received: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          var badgeCategories = this.$app.service('badge-categories')

          if (this.getParameterByName('id') != null) {
            this.$app.service('badge-categories').update(this.id, this.model)
            this.$router.push('/badges/badge-categories')
          } else {
            badgeCategories.create(this.model)
            this.$router.push('/badges/badge-categories')
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
          return this.$store.state['badge-categories'].list.find(instance => instance._id === this.id)
        } else {
          return {}
        }
      },
      done () {
        return this.$store.state['badge-categories'].done
      }
    },
    mounted: function () {
      this.$store.commit('setTitle', this.title)
    }
  }
</script>
