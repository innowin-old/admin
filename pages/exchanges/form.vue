<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-flex xs6>
          <v-form v-model="valid" ref="form" lazy-validation>

            <v-text-field
              label='Name'
              v-model='model.name'
              :rules='nameRules'
              :counter='100'
              required
            ></v-text-field>

            <v-text-field
              label='Link'
              v-model='model.link'
              :rules='linkRules'
              :counter='100'
              required
            ></v-text-field>

            <v-textarea
              label='Description'
              v-model='model.description'
              :rules='descriptionRules'
              :counter='300'
              required
            ></v-textarea>

            <v-text-field
              label='Members Count'
              v-model='model.members_count'
              :rules='membersCountRules'
              required
            ></v-text-field>

            <v-checkbox
              label="Private"
              v-model='model.private'
            ></v-checkbox>

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
      title: 'New Exchange',
      valid: true,
      id: null,
      name: '',
      nameRules: [
        (v) => !!v || 'Username is required',
        (v) => (v && v.length <= 100) || 'Username must be less than 100 characters'
      ],
      link: '',
      linkRules: [
        (v) => !!v || 'Link is required',
        (v) => (v && v.length <= 100) || 'Link must be less than 100 characters'
      ],
      description: '',
      descriptionRules: [
        (v) => !!v || 'Description is required',
        (v) => (v && v.length <= 300) || 'Description must be less than 300 characters'
      ],
      private: null,
      membersCount: '',
      membersCountRules: [
        (v) => !!v || 'Members Count is required'
      ],
      activeFlag: null,
      received: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          var exchanges = this.$app.service('exchanges')

          if (this.getParameterByName('id') != null) {
            this.$app.service('exchanges').update(this.id, this.model)
            this.$router.push('/exchanges')
          } else {
            exchanges.create(this.model)
            this.$router.push('/exchanges')
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
          return this.$store.state.exchanges.list.find(instance => instance._id === this.id)
        } else {
          return {}
        }
      },
      done () {
        return this.$store.state.exchanges.done
      }
    },
    mounted: function () {
      this.$store.commit('setTitle', this.title)
    }
  }
</script>
