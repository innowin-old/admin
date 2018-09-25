<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-flex xs6>
                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-autocomplete
                            v-model="model.badge_related_badge_category"
                            :items="badgeCategoriesItems"
                            :readonly="!isEditing"
                            :rules='badgeRelatedBadgeCategoryRules'
                            :label=" ' Badge Category ' "
                            persistent-hint
                        >
                        </v-autocomplete>

                        <v-autocomplete
                          v-model='model.badge_related_parent_service'
                          :items='parentServicesItems'
                          :readonly="!isEditing"
                          :rules='badgeRealatedParentServiceRules'
                          :label=" 'Related Parent Service' "
                          persistent-hint
                          @change="badgeRelatedParentServiceChange"
                        >
                        </v-autocomplete>

                        <!--<v-select
                            label='Related Parent'
                            v-model='model.badge_related_parent'
                            :rules='badgeRelatedParentRules'
                            :items="parentsItems"
                            :clearable=true
                        ></v-select> -->

                        <v-autocomplete
                                v-model='model.badge_related_parent'
                                :items="badge_related_parent_states"
                                :readonly="!isEditing"
                                :rules='badgeRelatedParentRules'
                                :label=" 'Related Parent' "
                                persistent-hint
                        >
                        </v-autocomplete>

                        <v-checkbox
                            label='Badge Active'
                            v-model='model.badge_active'
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
    /* eslint-disable indent */

    export default {
        data: () => ({
            title: 'New Badge',
            valid: true,
            id: null,
            isEditing: true,
            badge_related_parent_states: [],
            badgeRelatedBadgeCategoryRules: [
                (v) => !!v || 'badge realted category is required'
            ],
            badgeRealatedParentServiceRules: [
                (v) => !!v || 'badge related parent service is required'
            ],
            badgeRelatedParentRules: [
                (v) => !!v || 'badge related parent is required'
            ],
            received: false,
            selectedService: ''
        }),
        methods: {
            getIdentifierField () {
                switch (this.selectedService) {
                    case 'users':
                    case 'organizations':
                    return 'username'
                    case 'identities':
                    return 'name'
                    default:
                    return ''
                }
            },
            badgeRelatedParentServiceChange () {
                this.selectedService = this.model.badge_related_parent_service
                console.log(this.parentsItems)
            },
            clone (obj) {
                if (obj == null || typeof obj !== 'object') return obj
                var copy = obj.constructor()
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
                }
                return copy
            },
            submit () {
                if (this.$refs.form.validate()) {
                    var instance = {}
                    instance = this.clone(this.model)
                    try {
                        instance.badge_related_badge_category = this.$store.state['badge-categories'].list.find(a => a.text === this.model.badge_related_badge_category)._id
                    } catch (e) {
                        instance.badge_related_badge_category = null
                    }

                    try {
                        instance.badge_related_parent = this.$store.state[this.selectedService].list.find(a => a[this.getIdentifierField()] === this.model.badge_related_parent)._id
                    } catch (e) {
                        instance.badge_related_parent = null
                    }

                    var badges = this.$app.service('badges')
                    console.log(instance)
                    if (this.getParameterByName('id') != null) {
                        badges.update(this.id, instance)
                        this.$router.push('/badges/')
                    } else {
                        badges.create(instance)
                        this.$router.push('/badges/')
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
                    var instance = this.clone(this.$store.state.badges.list.find(instance => instance._id === this.id))
                    this.selectedService = this.badge_related_parent_service
                    console.log(this.badge_related_service)
                    try {
                        instance.badge_related_badge_category = this.$store.state['badge-categories'].list.find(a => a._id === instance.badge_related_badge_category).text
                    } catch (e) {}
                    try {
                        instance.badge_related_parent = this.$store.state[this.selectedService].list.find(a => a._id === instance.badge_related_parent)[this.getIdentifierField()]
                    } catch (e) {}
                    console.log(instance)
                    return instance
                } else {
                    return {}
                }
            },
            badgeCategoriesItems () {
                if (this.$store.state['badge-categories'].done) {
                    return this.$store.state['badge-categories'].list.map(a => a.text)
                } else {
                    return []
                }
            },
            parentServicesItems () {
                return [
                    'users',
                    'organizations',
                    'identities'
                ]
            },
            parentsItems () {
                if (this.selectedService) {
                    if (this.$store.state[this.selectedService].done) {
                        this.$data.badge_related_parent_states = this.$store.state[this.selectedService].list.map(a => a[this.getIdentifierField()])
                } else {
                    return []
                }
                } else {
                    return []
                }
            },
            pictureMediaItems () {
                return []
            },
            done () {
                return this.$store.state.badges.done
            }
        },
        mounted: function () {
            this.$store.commit('setTitle', this.title)
            if (this.getParameterByName('id') != null) {
                this.$data.selectedService = this.model.badge_related_parent_service
                this.$data.badge_related_parent_states = this.$store.state[this.selectedService].list.map(a => a[this.getIdentifierField()])
            }
        }
  }
</script>
