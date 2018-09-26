<template>

    <v-container>

        <v-card>
            <v-card-text>
                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=" نام کشور "
                                v-model="model.name"
                                :counter="100"
                                :rules="nameRules"
                                required
                        ></v-text-field>

                        <v-text-field
                                label=" کد کشور "
                                v-model="model.code"
                                :counter="100"
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
        data: () => ({
            title: 'Add / Edit Countries',
            valid: true,
            id: null,
            nameRules: [
                (v) => !!v || 'name is required',
                (v) => (v && v.length <= 100) || 'name must be less than 100 character'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    if (this.getParameterByName('id') !== null) {
                        this.$app.service('countries').update(this.id, this.model)
                    } else {
                        console.log(this.model)
                        this.$app.service('countries').create(this.model)
                    }
                    this.$router.push('/gis/countries')
                } else {
                    console.log('form is not valid')
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
                    this.id = this.getParameterByName('id')
                    return this.$store.state.countries.list.find(e => e._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.countries.done
            }
        },
        mounted: function () {
            this.$store.commit('setTitle', this.title)
        }
    }
</script>

<style scoped>

</style>