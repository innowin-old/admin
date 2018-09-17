<template>

    <v-container>

        <v-card>
            <v-card-text>
                <v-flex xs6>

                    <v-form v-model="valid" ref="form" lazy-validation>

                        <v-text-field
                                label=' نام کاربری '
                                v-model='model.username'
                                :rules="usernameRules"
                                :counter='100'
                                required
                        ></v-text-field>

                        <v-text-field
                                label=' رمز عبور '
                                v-model='model.password'
                                :rules="passwordRules"
                                type="password"
                                :counter='100'
                                required
                        ></v-text-field>

                        <v-text-field
                                label=" نام "
                                v-model="model.first_name"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" نام خانوادگی "
                                v-model="model.last_name"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" ایمیل "
                                v-model="model.email"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" آدرس وب سایت "
                                v-model="model.website"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=' ایمیل عمومی '
                                v-model='model.public_email'
                                :rules="publicEmailRules"
                                :counter='100'
                        ></v-text-field>

                        <v-text-field
                                label=" کد ملی "
                                v-model="model.national_code"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" عکس پروفایل "
                                v-model="model.profile_media"
                                :rules="relatedMediaRules"
                                :counter="100"
                        ></v-text-field>

                        <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="date"
                                persistent
                                lazy
                                full-width
                                width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="model.birth_date"
                                    label=" تاریخ تولد "
                                    prepend-icon="event"
                                    readonly
                            ></v-text-field>
                            <v-date-picker v-model="model.birth_date" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialog.save(model.birth_date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>


                        <v-text-field
                                label=" اکانت تلگرام "
                                v-model="model.telegram_account"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" معرفی "
                                v-model="model.description"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" جنسیت "
                                v-model="model.gender"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" آدرس صفحه ی گوگل پلاس "
                                v-model="model.google_plus_address"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" هدلاین لینکاین "
                                v-model="model.linkedin_headline"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" پوزیشن های لینکداین "
                                v-model="model.linkedin_positions"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" آدرس "
                                v-model="model.address"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" کشور "
                                v-model="model.related_country"
                                :rules="relatedCountryRules"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" استان "
                                v-model="model.related_province"
                                :rules="relatedProvinceRules"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=" شهر "
                                v-model="model.related_town"
                                :rules="relatedTownRules"
                                :counter="100"
                        ></v-text-field>

                        <v-text-field
                                label=' فکس '
                                v-model='model.fax'
                                :rules="faxRules"
                                :counter='100'
                        ></v-text-field>

                        <v-text-field
                                label=' تلفن ثابت '
                                v-model='model.phone'
                                :rules="phoneRules"
                                :counter='100'
                        ></v-text-field>

                        <v-text-field
                                label=' تلفن همراه '
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
    /* eslint-disable indent,spaced-comment,no-unused-vars */
    import {isEmailValid, isMobileValid, isPhoneValid, isNumerice} from '../../utils/validation'

    export default {
        name: '',
        title: 'Add User',
        data: () => ({
            valid: true,
            id: null,
            date: null,
            menu: false,
            modal: false,
            username: '',
            usernameRules: [
                (v) => !!v || 'username is required',
                (v) => (v && v.length <= 100) || 'username must be less than 100 character'
            ],
            public_email: '',
            publicEmailRules: [
                (v) => (isEmailValid(v)) || 'email is not valid',
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'email must be less than 100 character'
            ],
            phone: '',
            phoneRules: [
                (v) => (isPhoneValid(v)) || 'phone is not valid',
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'phone must be less than 100 character'
            ],
            fax: '',
            faxRules: [
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'fax must be less than 100 character'
            ],
            mobile: '',
            mobileRules: [
                (v) => (isMobileValid(v)) || 'mobile number is not valid',
                (v) => (v === '' || v === undefined || v == null || (v && v.length <= 100)) || 'mobile must be less than 100 character'
            ],
            password: '',
            passwordRules: [
                (v) => !!v || 'password is required',
                (v) => (v && v.length <= 100) || 'password must be less than 100 character'
            ],
            first_name: '',
            last_name: '',
            email: '',
            website: '',
            national_code: '',
            profile_media: '',
            birth_date: '',
            telegram_account: '',
            description: '',
            gender: '',
            is_plus_user: '',
            is_user_organization: '',
            google_plus_address: '',
            social_image_url: '',
            linkedin_headline: '',
            linkedin_positions: '',
            yahoo_contacts: '',
            profile_strength: '',
            address: '',
            related_media: '',
            relatedMediaRules: [
                (v) => (v === '' || v === undefined || v == null || isNumerice(v)) || 'media must be numeric'
            ],
            related_country: '',
            relatedCountryRules: [
                (v) => (v === '' || v === undefined || v == null || isNumerice(v)) || 'country must be numeric'
            ],
            related_province: '',
            relatedProvinceRules: [
                (v) => (v === '' || v === undefined || v == null || isNumerice(v)) || 'province must be numeric'
            ],
            related_town: '',
            relatedTownRules: [
                (v) => (v === '' || v === undefined || v == null || isNumerice(v)) || 'town must be numeric'
            ],
            banner: ''
        }),
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    if (this.getParameterByName('id') != null) {
                        this.$app.service('users').update(this.id, this.model)
                        this.$router.push('/users')
                    } else {
                        let users = this.$app.service('users')
                        users.create(this.model)
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