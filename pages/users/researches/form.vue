<template>

    <v-container>

        <v-card>
            <v-card-text>
                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=' عنوان '
                                v-model='model.title'
                                :rules="titleRules"
                                :counter='100'
                                required
                        ></v-text-field>

                        <v-text-field
                                label=" آدرس وب "
                                v-model="model.url"
                                :counter="200"
                        ></v-text-field>

                        <v-text-field
                                label=" نویسنده "
                                v-model="author_text"
                                :counter="100"
                                @keyup.enter.native="appendAuthor"
                        >
                        </v-text-field>

                        <div class="array-container">
                            <div class="array-item" v-for="author_item in author">
                                {{author_item}}
                                <v-icon
                                        @click="clearAuthor(author_item)"
                                >clear</v-icon>
                            </div>
                        </div>
                        <div style="clear: both"></div>

                        <v-text-field
                                label=" انتشارات "
                                v-model="model.publication"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" سال انتشار "
                                v-model="model.year"
                                :rules="yearRules"
                                :counter="4"
                        ></v-text-field>

                        <v-text-field
                                label=" تعداد صفحات "
                                v-model="model.page_count"
                                :counter="10"
                        ></v-text-field>

                        <v-text-field
                                label=" لینک تحقیق "
                                v-model="model.research_link"
                                :counter="100"
                        ></v-text-field>

                        <v-autocomplete
                                v-model="model.research_user"
                                :items="research_user_states"
                                :readonly="!isEditing"
                                :rules="researchUserRules"
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
    /* eslint-disable indent,camelcase */
    import {isNumerice} from '../../../utils/validation'

    export default {
        name: '',
        title: 'Add Research',
        data: () => ({
            valid: true,
            id: null,
            isEditing: true,
            research_user_states: [],
            author_text: '',
            title: '',
            titleRules: [
                (v) => !!v || 'title is required',
                (v) => (v && v.length <= 100) || 'title must be less than 100 character'
            ],
            url: '',
            author: [],
            publication: '',
            year: '',
            yearRules: [
                (v) => (v === '' || v === undefined || v == null || isNumerice(v)) || 'media must be numeric'
            ],
            page_count: '',
            research_link: '',
            research_user: '',
            researchUserRules: [
                (v) => !!v || 'research user is required'
            ]
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    const user_object = this.$store.state.users.list.find(e => e.username === this.model.research_user)
                    this.model.research_user = user_object._id
                    if (this.getParameterByName('id') != null) {
                        this.$app.service('researches').update(this.id, this.model)
                        this.$router.push('/users/researches')
                    } else {
                        this.$app.service('researches').create(this.model)
                        this.$router.push('/users/researches')
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
            },
            appendAuthor () {
                console.log(this.$data.author_text)
                this.model.author.push(this.$data.author_text)
                this.$data.author.push(this.$data.author_text)
                this.$data.author_text = ''
            },
            clearAuthor (author_name) {
                this.$data.author.splice(this.$data.author.indexOf(author_name), 1)
                this.model.author.splice(this.model.author.indexOf(author_name), 1)
            }
        },
        computed: {
            model () {
                if (this.getParameterByName('id') != null && this.done) {
                    this.id = this.getParameterByName('id')
                    return this.$store.state.researches.list.find(instance => instance._id === this.id)
                } else {
                    return {}
                }
            },
            done () {
                return this.$store.state.researches.done
            }
        },
        mounted: function () {
            let users = this.$store.state.users.list
            for (let i = 0; i < users.length; i++) {
                this.$data.research_user_states.push(users[i].username)
            }
            if (this.model.research_user !== undefined) {
                const user_object = this.$store.state.users.list.find(element => element._id === this.model.research_user)
                this.model.research_user = user_object.username

                for (let i = 0; i < this.model.author.length; i++) {
                    this.$data.author.push(this.model.author[i])
                }
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