<template>

    <v-container>

        <v-card>

            <v-card-text>

                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=" نام استان "
                                v-model="model.name"
                                :counter="100"
                                :rules="nameRules"
                                required
                        ></v-text-field>

                        <v-text-field
                                label=" کد استان "
                                v-model="model.code"
                                :counter="100"
                        ></v-text-field>

                        <v-autocomplete
                                v-model="model.province_related_country"
                                :items="province_related_country_states"
                                :readonly="!isEditing"
                                :label=" ' انتخاب کشور ' "
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
        data: () => ({
            title: 'Add / Edit Provinces',
            valid: true,
            id: null,
            isEditing: true,
            province_related_country_states: [],
            nameRules: [
                (v) => !!v || 'name of province is required',
                (v) => (v && v.length <= 100) || 'name of province must be less than 100 character'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    let countryObject = this.$store.state.countries.list.find(instance => instance.name === this.model.province_related_country)
                    this.model.province_related_country = countryObject._id
                    console.log(this.model.province_related_country)
                    if (this.getParameterByName('id') !== null) {
                        this.$app.service('provinces').update(this.id, this.model)
                    } else {
                        this.$app.service('provinces').create(this.model)
                        console.log('province created')
                    }
                    this.$router.push('/gis/provinces/')
                } else {
                    console.log('form is not valid')
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
                if (this.getParameterByName('id') !== null && this.done) {
                    this.id = this.getParameterByName('id')
                    return this.$store.state.provinces.list.find(instance => instance._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.provinces.done
            }
        },
        mounted: function () {
            this.$store.commit('setTitle', this.title)
            let countries = this.$store.state.countries.list
            countries.forEach(country => {
                this.$data.province_related_country_states.push(country.name)
            })
            if (this.model.province_related_country !== undefined) {
                const countryObject = this.$store.state.countries.list.find(e => e._id === this.model.province_related_country)
                this.model.province_related_country = countryObject.name
                console.log(this.model)
            }
        }
    }
</script>

<style scoped>
    .array-container {
        padding-top: 10px;
        padding-bottom: 20px;
    }
    .array-item {
        float: left;
        margin-left: 20px;
        padding: 10px;
        background: grey;
        border-radius: 5px;
    }
</style>