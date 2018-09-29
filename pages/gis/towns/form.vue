<template>

    <v-container>

        <v-card>

            <v-card-text>

                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=" نام شهر "
                                v-model="model.name"
                                :counter="100"
                                :rules="nameRules"
                                required
                        ></v-text-field>

                        <v-text-field
                                label=" کد شهر "
                                v-model="model.code"
                                :coutner="100"
                        ></v-text-field>

                        <v-autocomplete
                                v-model="model.town_related_province"
                                :items="town_related_province_states"
                                :readonly="!isEditing"
                                :rules="townRelatedProvinceRules"
                                :label=" ' انتخاب استان ' "
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
            title: 'Add / Edit Town',
            valid: true,
            id: null,
            isEditing: true,
            town_related_province_states: [],
            nameRules: [
                (v) => !!v || 'town name is required',
                (v) => (v && v.length <= 100) || 'town name must not be less than 100 character'
            ],
            townRelatedProvinceRules: [
                (v) => !!v || 'related province is required'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    let provinceObject = this.$store.state.provinces.list.find(instance => instance.name === this.model.town_related_province)
                    this.model.town_related_province = provinceObject._id
                    if (this.getParameterByName('id') !== null) {
                        this.$app.service('towns').update(this.id, this.model)
                    } else {
                        this.$app.service('towns').create(this.model)
                    }
                    this.$router.push('/gis/towns/')
                } else {
                    console.log('town form is not valid')
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
                if (this.getParameterByName('id') && this.done) {
                    this.id = this.getParameterByName('id')
                    return this.$store.state.towns.list.find(instance => instance._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.towns.done
            }
        },
        mounted: function () {
            this.$store.commit('setTitle', this.title)
            let provinces = this.$store.state.provinces.list
            provinces.forEach(province => {
                this.$data.town_related_province_states.push(province.name)
            })
            console.log(this.model)
            if (this.model.town_related_province !== undefined) {
                console.log(this.model.town_related_province)
                const provinceObject = this.$store.state.provinces.list.find(e => e._id === this.model.town_related_province)
                console.log('the province object is : ')
                console.log(provinceObject)
                this.model.town_related_province = provinceObject.name
            }
        }
    }
</script>

<style scoped>

</style>