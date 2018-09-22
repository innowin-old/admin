<template>

    <v-container>

        <v-card>

            <v-card-text>

                <v-flex xs6>
                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=' مقطع تحصیلی '
                                v-model='model.grade'
                                :counter='100'
                                :rules="gradeRules"
                                required
                        ></v-text-field>

                        <v-text-field
                                label=' نام دانشگاه '
                                v-model='model.university'
                                :counter='100'
                                :rules="universityRules"
                                required
                        ></v-text-field>

                        <v-text-field
                                label=' رشته ی تحصیلی '
                                v-model='model.field_of_study'
                                :counter='100'
                                :rules="fieldOfStudyRules"
                                required
                        ></v-text-field>

                        <v-menu
                                ref="menu"
                                :close-on-content-click="false"
                                v-model="menu"
                                :nudge-right="40"
                                :return-value.sync="date"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="date"
                                    label=" تاریخ شروع "
                                    prepend-icon="event"
                                    readonly
                            ></v-text-field>
                            <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>

                        <v-menu
                                ref="menu2"
                                :close-on-content-click="false"
                                v-model="menu2"
                                :nudge-right="40"
                                :return-value.sync="to_date_date"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="to_date_date"
                                    label=" تاریخ پایان "
                                    prepend-icon="event"
                                    readonly
                            ></v-text-field>
                            <v-date-picker v-model="to_date_date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu2.save(to_date_date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>

                        <v-text-field
                                label=' معدل '
                                v-model='model.average'
                                :counter='100'
                                required
                        ></v-text-field>

                        <v-text-field
                                label=' توضیحات '
                                v-model='model.description'
                                :counter='500'
                                required
                        ></v-text-field>

                        <v-autocomplete
                                v-model="model.education_user"
                                :items="user_states"
                                :readonly="!isEditing"
                                :rules="educationUserRules"
                                :label=" ' انتخاب کاربر ' "
                                persistent-hint
                        >
                        </v-autocomplete>

                        <v-btn
                                @click="submit"
                                :disable="!valid"
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
    /* eslint-disable indent,camelcase */

    export default {
        name: 'form',
        title: 'Add / Edit Education',
        data: () => ({
            valid: true,
            id: null,
            date: null,
            to_date_date: null,
            menu: false,
            menu2: false,
            activator_to: false,
            isEditing: true,
            user_states: [],
            grade: '',
            gradeRules: [
                (v) => !!v || 'grade is required',
                (v) => (v && v.length <= 100) || 'grade must be less than 100 character'
            ],
            university: '',
            universityRules: [
                (v) => !!v || 'university is required',
                (v) => (v && v.length <= 100) || 'university must be less than 100 character'
            ],
            field_of_study: '',
            fieldOfStudyRules: [
                (v) => !!v || 'field of study is required',
                (v) => (v && v.length <= 100) || 'field of study must be less than 100 character'
            ],
            from_date: '',
            to_date: '',
            average: '',
            description: '',
            education_user: '',
            educationUserRules: [
                (v) => !!v || 'education is required',
                (v) => (v && v.length <= 100) || 'education must be less than 100 character'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    const user_object = this.$store.state.users.list.find(e => e.username === this.model.education_user)
                    this.model.education_user = user_object._id
                    this.model.from_date = ''
                    this.model.from_date = this.$data.date
                    this.model.to_date = ''
                    this.model.to_date = this.$data.to_date_date
                    if (this.getParameterByName('id') != null) {
                        this.$app.service('educations').update(this.id, this.model)
                        this.$router.push('/users/educations')
                    } else {
                        this.$app.service('educations').create(this.model)
                        this.$router.push('/users/educations')
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
                    return this.$store.state.educations.list.find(instance => instance._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.educations.done
            }
        },
        mounted: function () {
            let users = this.$store.state.users.list
            for (let i = 0; i < users.length; i++) {
                this.$data.user_states.push(users[i].username)
            }
            this.$data.menu = false
            this.$data.menu2 = false
            this.$data.date = this.model.from_date
            this.$data.to_date_date = this.model.to_date
            if (this.model.education_user !== undefined) {
                const user_object = this.$store.state.users.list.find(e => e._id === this.model.education_user)
                this.model.education_user = user_object.username
                console.log(this.model)
            }
        }
    }
</script>

<style scoped>

</style>