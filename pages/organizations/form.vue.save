<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-flex xs6>
          <v-form v-model="valid" ref="form" lazy-validation>

            <v-text-field
              label='Username'
              v-model='model.username'
              :rules='usernameRules'
              :counter='100'
              required
            ></v-text-field>

            <v-text-field
              label='Email'
              v-model='model.email'
              :rules='emailRules'
              :counter='100'
              required
            ></v-text-field>

            <v-textarea
              label='Public Email'
              v-model='model.public_email'
              :rules='publicEmailRules'
              :counter='300'
            ></v-textarea>

            <v-text-field
              label='Nike Name'
              v-model='model.nike_name'
              :rules='nikeNameRules'
            ></v-text-field>

            <v-text-field
              label='Official Name'
              v-model='model.official_name'
              :rules='officialNameRules'
              required
            ></v-text-field>

            <v-text-field
              label='National Code'
              v-model='model.national_code'
              :rules='nationalCodeRules'
            ></v-text-field>

            <v-text-field
              label='Registration Ads Url'
              v-model='model.registration_ads_url'
              :rules='registrationAdsUrlRules'
            ></v-text-field>

            <v-text-field
              label='Ownership Type'
              v-model='model.ownership_type'
              :rules='ownershipTypeRules'
            ></v-text-field>

            <v-text-field
              label='Business Type'
              v-model='model.business_type'
              :rules='businessTypeRules'
            ></v-text-field>

            <v-text-field
              label='Biography'
              v-model='model.biography'
              :rules='biographyRules'
            ></v-text-field>

            <v-textarea
              label='Description'
              v-model='model.description'
              :rules='descriptionRules'
            ></v-textarea>

            <v-text-field
              label='Correspondence Language'
              v-model='model.correspondence_language'
              :rules='correspondenceLanguageRules'
            ></v-text-field>

            <v-text-field
              label='Social Network'
              v-model='model.social_network'
              :rules='socialNetworkRules'
            ></v-text-field>

            <v-text-field
              label='Staff Count'
              v-model='model.staff_count'
              :rules='staffCountRules'
            ></v-text-field>

            <v-select
              label='Owner'
              v-model='model.owner'
              :rules='ownerRules'
              :items='ownersItems'
              :clearable=true
            ></v-select>

            <v-text-field
              label='Organization Logo'
              v-model='model.organization_logo'
              :rules='organizationLogoRules'
            ></v-text-field>

            <v-text-field
              label='Organization Banner'
              v-model='model.organization_banner'
              :rules='organizationBannerRules'
            ></v-text-field>

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
      title: 'New Organization',
      valid: true,
      id: null,
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => (v && v.length <= 100) || 'Username must be less than 100 characters'
      ],
      emailRules: [],
      publicEmailRules: [],
      nikeNameRules: [],
      officialNameRules: [],
      nationalCodeRules: [],
      registrationAdsUrlRules: [],
      registrarOrganizationRules: [],
      countryRules: [],
      provinceRules: [],
      cityRules: [],
      addressRules: [],
      phoneRules: [],
      websiteRules: [],
      establishedYearRules: [],
      ownershipTypeRules: [],
      businessTypeRules: [],
      biographyRules: [],
      descriptionRules: [],
      correspondenceLanguageRules: [],
      socialNetworkRules: [],
      staffCountRules: [],
      ownerRules: [],
      organizationLogoRules: [],
      organizationBannerRules: [],
      received: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          var instance = this.model

          try {
            instance.owner = this.$store.state.identities.list.find(a => a.name === this.model.owner)._id
          } catch (e) {
            instance.owner = null
          }

          var organizations = this.$app.service('organizations')

          if (this.getParameterByName('id') != null) {
            this.$app.service('organizations').update(this.id, instance)
            this.$router.push('/organizations')
          } else {
            organizations.create(instance)
            this.$router.push('/organizations')
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
          var instance = this.$store.state.organizations.list.find(instance => instance._id === this.id)

          try {
            instance.owner = this.$store.state.identities.list.find(a => a._id === instance.owner).name
          } catch (e) {}

          return instance
        } else {
          return {}
        }
      },
      ownersItems () {
        if (this.$store.state.identities.done) {
          return this.$store.state.identities.list.map(a => a.name)
        } else {
          return []
        }
      },
      done () {
        return this.$store.state.organizations.done
      }
    },
    mounted: function () {
      this.$store.commit('setTitle', this.title)
    }
  }
</script>
