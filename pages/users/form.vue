<template>

    <v-container>

        <v-card>
            <v-card-text>
                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label='Username'
                                v-model='model.username'
                                :rules="usernameRules"
                                :counter='100'
                                required
                        ></v-text-field>

                        <v-text-field
                                label='Password'
                                v-model='model.password'
                                :rules="passwordRules"
                                type="password"
                                :counter='100'
                                required
                        ></v-text-field>

                        <v-text-field
                                label='Public Email'
                                v-model='model.public_email'
                                :rules="publicEmailRules"
                                :counter='100'
                        ></v-text-field>

                        <v-text-field
                                label='Fax'
                                v-model='model.fax'
                                :rules="faxRules"
                                :counter='100'
                        ></v-text-field>

                        <v-text-field
                                label='Phone'
                                v-model='model.phone'
                                :rules="phoneRules"
                                :counter='100'
                        ></v-text-field>

                        <v-text-field
                                label='Mobile'
                                v-model='model.mobile'
                                :rules="mobileRules"
                                :counter='100'
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
    /* eslint-disable indent */

    export default {
        name: '',
        title: 'Add User',
        data: () => ({
            valid: true,
            id: null,
            username: '',
            usernameRules: [
                (v) => !!v || 'username is required',
                (v) => (v && v.length <= 100) || 'username must be less than 100 character'
            ],
            public_email: '',
            publicEmailRules: [
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'email must be less than 100 character'
            ],
            phone: '',
            phoneRules: [
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'phone must be less than 100 character'
            ],
            fax: '',
            faxRules: [
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'fax must be less than 100 character'
            ],
            mobile: '',
            mobileRules: [
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'mobile must be less than 100 character'
            ],
            password: '',
            passwordRules: [
                (v) => !!v || 'password is required',
                (v) => (v && v.length <= 100) || 'password must be less than 100 character'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    if (this.getParameterByName('id') != null) {
                        this.$app.service('users').update(this.id, this.model)
                        this.$router.push('/users')
                    } else {
                        let users = this.$app.service('exchanges')
                        users.create(this.model())
                        this.$router.push('/users')
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
                    return this.$store.state.users.list.find(instance => instance._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.users.done
            }
        },
        mounted: function () {
            this.$store.commit('setTitle', this.title)
        }
    }
</script>

<style scoped>

</style>