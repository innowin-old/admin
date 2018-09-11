<template>
  <v-app dark>
    <Navigation v-if="is_authenticated" />
    <v-content v-if="is_authenticated">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Login v-else />
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Navigation from '~/components/Navigation'
  import Login from '~/components/Login'
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Dashboard', to: '/' },
          { icon: 'bubble_chart', title: 'Users', to: '/users/' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    components: {
      Navigation,
      Login
    },
    computed: {
      token: function () {
        return this.$store.state.token
      },
      is_authenticated: function () {
        return this.$store.state.is_authenticated
      }
    },
    mounted () {
      try {
        this.$app.authenticate().then(() => {
          this.$store.commit('setAuthenticated', true)

          this.$app.service('users').find({}).then(response => {
            this.$store.commit('users/get', response.data)
            this.$store.commit('users/done')
          })

          this.$app.service('users').on('created', response => {
            this.$store.commit('users/add', response)
          })

          this.$app.service('users').on('updated', result => {
            this.$app.service('users').find({}).then(response => {
              this.$store.commit('users/get', response.data)
            })
          })

          this.$app.service('exchanges').find({}).then(response => {
            this.$store.commit('exchanges/get', response.data)
            this.$store.commit('exchanges/done')
          })

          this.$app.service('exchanges').on('created', response => {
            this.$store.commit('exchanges/add', response)
          })

          this.$app.service('exchanges').on('updated', exchange => {
            this.$app.service('exchanges').find({}).then(response => {
              this.$store.commit('exchanges/get', response.data)
            })
          })

          this.$app.service('organizations').find({}).then(response => {
            this.$store.commit('organizations/get', response.data)
            this.$store.commit('organizations/done')
          })

          this.$app.service('organizations').on('created', response => {
            this.$store.commit('organizations/add', response)
          })

          this.$app.service('organizations').on('updated', organization => {
            this.$app.service('organizations').find({}).then(response => {
              this.$store.commit('organizations/get', response.data)
            })
          })

          // Products
          this.$app.service('products').find({}).then(response => {
            this.$store.commit('products/get', response.data)
            this.$store.commit('products/done')
          })

          this.$app.service('products').on('created', response => {
            this.$store.commit('products/add', response)
          })

          this.$app.service('products').on('updated', exchange => {
            this.$app.service('products').find({}).then(response => {
              this.$store.commit('products/get', response.data)
            })
          })

          // Certificates
          this.$app.service('certificates').find({}).then(response => {
            this.$store.commit('certificates/get', response.data)
            this.$store.commit('certificates/done')
          })

          this.$app.service('certificates').on('created', response => {
            this.$store.commit('certificates/add', response)
          })

          this.$app.service('certificates').on('updated', exchange => {
            this.$app.service('certificates').find({}).then(response => {
              this.$store.commit('certificates/get', response.data)
            })
          })

          // Identities
          this.$app.service('identities').find({}).then(response => {
            this.$store.commit('identities/get', response.data)
            this.$store.commit('identities/done')
          })

          this.$app.service('identities').on('created', response => {
            this.$store.commit('identities/add', response)
          })

          this.$app.service('identities').on('updated', identity => {
            this.$app.service('identities').find({}).then(response => {
              this.$store.commit('identities/get', response.data)
            })
          })

          // Badges
          this.$app.service('badges').find({}).then(response => {
            this.$store.commit('badges/get', response.data)
            this.$store.commit('badges/done')
          })

          this.$app.service('badges').on('created', response => {
            this.$store.commit('badges/add', response)
          })

          this.$app.service('badges').on('updated', badge => {
            this.$app.service('badges').find({}).then(response => {
              this.$store.commit('badges/get', response.data)
            })
          })

          // Badge Categories
          this.$app.service('badge-categories').find({}).then(response => {
            this.$store.commit('badge-categories/get', response.data)
            this.$store.commit('badge-categories/done')
          })

          this.$app.service('badge-categories').on('created', response => {
            this.$store.commit('badge-categories/add', response)
          })

          this.$app.service('badge-categories').on('updated', badge => {
            this.$app.service('badge-categories').find({}).then(response => {
              this.$store.commit('badge-categories/get', response.data)
            })
          })

          // Skills
          this.$app.service('skills').find({}).then(response => {
            this.$store.commit('skills/get', response.data)
            this.$store.commit('skills/done')
          })

          this.$app.service('skills').on('created', response => {
            this.$store.commit('skills/add', response)
          })

          this.$app.service('skills').on('updated', instance => {
            this.$app.service('skills').find({}).then(response => {
              this.$store.commit('skills/get', response.data)
            })
          })

          // Urls
          this.$app.service('urls').find({}).then(response => {
            this.$store.commit('urls/get', response.data)
            this.$store.commit('urls/done')
          })

          this.$app.service('urls').on('created', response => {
            this.$store.commit('urls/add', response)
          })

          this.$app.service('urls').on('updated', instance => {
            this.$app.service('urls').find({}).then(response => {
              this.$store.commit('urls/get', response.data)
            })
          })

          // Researches
          this.$app.service('researches').find({}).then(response => {
            this.$store.commit('researches/get', response.data)
            this.$store.commit('researches/done')
          })

          this.$app.service('researches').on('created', response => {
            this.$store.commit('researches/add', response)
          })

          this.$app.service('researches').on('updated', instance => {
            this.$app.service('researches').find({}).then(response => {
              this.$store.commit('researches/get', response.data)
            })
          })

          // Educations
          this.$app.service('educations').find({}).then(response => {
            this.$store.commit('educations/get', response.data)
            this.$store.commit('educations/done')
          })

          this.$app.service('educations').on('created', response => {
            this.$store.commit('educations/add', response)
          })

          this.$app.service('educations').on('updated', instance => {
            this.$app.service('educations').find({}).then(response => {
              this.$store.commit('educations/get', response.data)
            })
          })

          // Abilities
          this.$app.service('abilities').find({}).then(response => {
            this.$store.commit('abilities/get', response.data)
            this.$store.commit('abilities/done')
          })

          this.$app.service('abilities').on('created', response => {
            this.$store.commit('abilities/add', response)
          })

          this.$app.service('abilities').on('updated', instance => {
            this.$app.service('abilities').find({}).then(response => {
              this.$store.commit('abilities/get', response.data)
            })
          })

          // Categories
          this.$app.service('categories').find({}).then(response => {
            this.$store.commit('categories/get', response.data)
            this.$store.commit('categories/done')
          })

          this.$app.service('categories').on('created', response => {
            this.$store.commit('categories/add', response)
          })

          this.$app.service('categories').on('updated', instance => {
            this.$app.service('categories').find({}).then(response => {
              this.$store.commit('categories/get', response.data)
            })
          })

          // Category Fields
          this.$app.service('category-fields').find({}).then(response => {
            this.$store.commit('category-fields/get', response.data)
            this.$store.commit('category-fields/done')
          })

          this.$app.service('category-fields').on('created', response => {
            this.$store.commit('category-fields/add', response)
          })

          this.$app.service('category-fields').on('updated', instance => {
            this.$app.service('category-fields').find({}).then(response => {
              this.$store.commit('category-fields/get', response.data)
            })
          })

          // Comments
          this.$app.service('comments').find({}).then(response => {
            this.$store.commit('comments/get', response.data)
            this.$store.commit('comments/done')
          })

          this.$app.service('comments').on('created', response => {
            this.$store.commit('comments/add', response)
          })

          this.$app.service('comments').on('updated', instance => {
            this.$app.service('comments').find({}).then(response => {
              this.$store.commit('comments/get', response.data)
            })
          })
        }).catch(() => {
          this.$store.commit('setAuthenticated', false)
        })
      } catch (e) {
        console.log(e)
      }
    },
    destroyed () {
      this.$app.service('users').removeListener('created')
      this.$app.service('users').removeListener('updated')

      this.$app.service('exchanges').removeListener('created')
      this.$app.service('exchanges').removeListener('updated')

      this.$app.service('organizations').removeListener('created')
      this.$app.service('organizations').removeListener('updated')

      this.$app.service('products').removeListener('created')
      this.$app.service('products').removeListener('updated')
    }
  }
</script>
