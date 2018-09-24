<template>


    <v-container>

        <v-card>
            <v-card-text>
                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=' آدرس '
                                v-model='model.url'
                                :rules="urlRules"
                                :counter='100'
                                required
                        ></v-text-field>

                        <v-autocomplete
                                v-model="model.identity_url_related_identity"
                                :items="identity_states"
                                :readonly="!isEditing"
                                :rules="identityUrlRelatedIdentityRules"
                                :label=" ' انتخاب کاربر ' "
                                persistent-hint
                        >
                        </v-autocomplete>

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
        name: 'form',
        data: () => ({
            valid: true,
            id: null,
            isEditing: true,
            identity_states: [],
            url: '',
            urlRules: [
                (v) => !!v || 'url is required',
                (v) => (v && v.length <= 100) || 'url must be less than 100 character'
            ],
            identity_url_related_identity: '',
            identityUrlRelatedIdentityRules: [
                (v) => !!v || 'related identity is required',
                (v) => (v && v.length <= 100) || 'related identity must be less than 100 character'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    const identityObject = this.$store.state.identities.list.find(instance => instance.name === this.model.identity_url_related_identity)
                    this.model.identity_url_related_identity = identityObject._id
                    if (this.getParameterByName('id') !== null) {
                        this.$app.service('urls').update(this.id, this.model)
                        this.$router.push('/users/urls')
                    } else {
                        this.$app.service('urls').create(this.model)
                        this.$router.push('/users/urls')
                    }
                } else {
                    console.log('the form is not valid')
                }
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
                if (this.getParameterByName('id') !== null && this.done) {
                    this.id = this.getParameterByName(('id'))
                    return this.$store.state.urls.list.find(instance => instance._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.urls.done
            }
        },
        mounted: function () {
            let identities = this.$store.state.identities.list
            identities.forEach(identity => {
                this.$data.identity_states.push(identity.name)
            })
            if (this.model.identity_url_related_identity !== undefined) {
                const identityObject = this.$store.state.identities.list.find(element => element._id === this.model.identity_url_related_identity)
                this.model.identity_url_related_identity = identityObject.name
            }
        }
    }
</script>

<style scoped>

</style>