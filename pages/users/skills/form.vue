<template>

    <v-container>

        <v-card>

            <v-card-text>

                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=" عنوان "
                                v-model="model.title"
                                :counter='100'
                                :rules="titleRules"
                                required
                        ></v-text-field>

                        <v-text-field
                                label=" تگ مهارت "
                                v-model="model.tag"
                                :counter="100"
                        ></v-text-field>

                        <v-textarea
                                label=" توضیحات "
                                v-model="model.description"
                                :counter="300"
                        ></v-textarea>


                        <v-autocomplete
                                v-model="model.skill_user"
                                :items="skill_user_states"
                                :readonly="!isEditing"
                                :rules="skillUserRules"
                                :label=" ' انتخاب کاربر ' "
                                persistent-hint
                        >
                        </v-autocomplete>


                        <v-btn
                                @click="submit"
                                :disable="!valid"
                        >
                            Submit
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
        name: '',
        title: 'Add / Edit Skills',
        data: () => ({
            valid: true,
            id: null,
            isEditing: true,
            skill_user_states: [],
            title: '',
            titleRules: [
                (v) => !!v || 'title is required',
                (v) => (v && v.length <= 100) || 'title must be less than 100 character'
            ],
            tag: '',
            description: '',
            skill_user: '',
            skillUserRules: [
                (v) => !!v || 'user is required'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    const user_object = this.$store.state.users.list.find(e => e.username === this.model.skill_user)
                    this.model.skill_user = user_object._id
                    if (this.getParameterByName('id') != null) {
                        this.$app.service('skills').update(this.id, this.model)
                        this.$router.push('/users/skills')
                    } else {
                        this.$app.service('skills').create(this.model)
                        this.$router.push('/users/skills')
                    }
                } else {
                    console.log('form is invalid !!!')
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
                    return this.$store.state.skills.list.find(instance => instance._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.skills.done
            }
        },
        mounted: function () {
            let users = this.$store.state.users.list
            for (let i = 0; i < users.length; i++) {
                this.$data.skill_user_states.push(users[i].username)
            }
            if (this.model.skill_user !== undefined) {
                const user_object = this.$store.state.users.list.find(element => element._id === this.model.skill_user)
                this.model.skill_user = user_object.username
            }
        }
    }
</script>

<style scoped>

</style>