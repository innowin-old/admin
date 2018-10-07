<template>

    <v-container>
        <v-tabs fixed icons centered>
            <v-tabs-bar dark color="red">
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tabs-item href="#tab-1">
                    <v-icon>assessment</v-icon>
                    Excel
                </v-tabs-item>
                <v-tabs-item href="#tab-2">
                    <v-icon>text_format</v-icon>
                    CSV
                </v-tabs-item>
                <v-tabs-item href="#tab-3">
                    <v-icon>list</v-icon>
                    JSON
                </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-items>
                <v-tabs-content
                        key="1"
                        id="tab-1"
                >
                    <v-card v-if="errors.length">
                        <div>
                            <v-btn flat icon color="info" v-on:click="back">
                                <v-icon>arrow_back</v-icon>
                            </v-btn>
                        </div>
                        <v-data-table
                                v-bind:headers="headers"
                                :items="errors"
                                hide-actions
                                class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.data }}</td>
                                <td>{{ props.item.status }}</td>
                            </template>
                        </v-data-table>
                    </v-card>
                    <v-card flat v-else>
                        <v-container class="upload-content">
                            <v-btn color="primary" v-on:click="trigger" :disabled="loading">
                                Choose File
                                <v-icon right dark>cloud_upload</v-icon>
                            </v-btn>
                        </v-container>
                        <input ref="avatar" type="file" name="avatar" id="avatar" v-on:change="upload">
                        <v-container pt-0>
                            <v-toolbar v-for="(sheet, index) in sheets" class="review" :key="sheet.name">
                                <v-toolbar-title style="margin-left: 36px">{{sheet.name}}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
                                <v-toolbar-items class="hidden-sm-and-down">
                                    <v-btn flat>Records: {{sheet.size}}</v-btn>
                                    <v-btn flat color="primary" v-on:click="uploadOrganizations(index)" :loading="loading">Send</v-btn>
                                </v-toolbar-items>
                                <v-progress-circular
                                        :rotate="180"
                                        :size="100"
                                        :width="15"
                                        :value="value"
                                        color="blue"
                                >
                                </v-progress-circular>
                            </v-toolbar>
                        </v-container>
                    </v-card>
                </v-tabs-content>
                <v-tabs-content
                        key="2"
                        id="tab-2"
                >
                    <v-card flat>
                        <v-card-text>{{ text }}</v-card-text>
                    </v-card>
                </v-tabs-content>
                <v-tabs-content
                        key="3"
                        id="tab-3"
                >
                    <v-card flat>
                        <v-card-text>{{ text }}</v-card-text>
                    </v-card>
                </v-tabs-content>
            </v-tabs-items>
        </v-tabs>
    </v-container>

</template>

<script>
    /* eslint-disable indent,camelcase,no-unused-vars */
    import XLSX from 'xlsx'

    export default {
        data () {
            return {
                title: 'Import GIS',
                sheets: [],
                loading: false,
                errors: [],
                headers: [
                    {
                        text: 'Data',
                        align: 'left',
                        value: 'data'
                    },
                    { text: 'Status', value: 'status', align: 'left' }
                ],
                text: '',
                value: 0
            }
        },
        methods: {
            sleep: function (milliseconds) {
                var start = new Date().getTime()
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break
                    }
                }
            },
            upload: function (e) {
                // e.preventDefault();
                // var file = document.getElementById('avatar').files[0];
                var vm = this

                var reader = new window.FileReader()
                reader.readAsBinaryString(e.target.files[0])

                reader.onload = function (e) {
                    var data = reader.result
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    })

                    vm.sheets = []
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
                        var json_object = JSON.stringify(XL_row_object)
                        // console.log(json_object)
                        vm.sheets.push({
                            name: sheetName,
                            data: JSON.parse(json_object),
                            jsonString: json_object,
                            size: JSON.parse(json_object).length
                        })
                    })
                }
            },
            uploadOrganizations: function (sheet) {
                this.showLoading()
                const country = this.$store.state.countries.list.find(instance => instance.name === 'ایران')
                if (country === undefined) {
                    const country = this.$app.service('countries').create({ name: 'ایران' })
                }
                const records = JSON.parse(this.sheets[sheet].jsonString)
                const len = records.length
                const step = 100 / records.length
                const provinces = []
                const stored_provinces = this.$store.state.provinces.list
                const stored_provinces_length = this.$store.state.provinces.list.length
                stored_provinces.forEach((province_record, province_index) => {
                    provinces.push(province_record.name)
                    if ((province_index + 1) === stored_provinces_length) {
                        console.log(provinces)
                        console.log('man shoro kardam')
                        records.forEach((record, index) => {
                            console.log(stored_provinces.includes(record.ostn_name))
                            if (provinces.includes(record.ostn_name)) {
                                console.log('salaaaam')
                            } else {
                                this.$app.service('provinces').create({ name: record.ostn_name, province_related_country: country._id })
                                console.log(record.ostn_name + 'not found')
                                provinces.push(record.ostn_name)
                                this.sleep(3000)
                            }
                            if ((index + 1) === len) {
                                const towns = []
                                const stored_towns = this.$store.state.towns.list
                                const stored_towns_length = this.$store.state.towns.list.length
                                stored_towns.forEach((town_record, town_index) => {
                                    towns.push(town_record.name)
                                    if ((town_index + 1) === stored_towns_length) {
                                        console.log('man town ha ro shoro kardam')
                                        records.forEach((record, index) => {
                                            if (towns.includes(record.city_name)) {
                                                console.log('town found')
                                            } else {
                                                this.$app.service('towns').create({ name: record.city_name, town_related_province: this.getProvinceId(record.ostn_name) })
                                                towns.push(record.city_name)
                                                this.sleep(10000)
                                                console.log(record.city_name + ' added ')
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                /* records.forEach((record, index) => {
                    let province = this.$store.state.provinces.list.find(instance => instance.name === record.ostn_name)
                    if (province === undefined) {
                        // console.log(record.ostn_name + ' : ostn is created')
                        let promise = new Promise(function (resolve, reject) {
                            this.$app.service('provinces').create({ name: record.ostn_name, province_related_country: country._id })
                            resolve('Success!')
                        })
                        promise.then(function (value) {
                            let province = this.$store.state.provinces.list.find(instance => instance.name === record.ostn_name)
                            // expected output: "Success!"
                        })
                        console.log(record.ostn_name + ' -> added')
                        this.sleep(3000)
                    }
                    if ((index + 1) === len) {
                        records.forEach(record => {
                            let town = this.$store.state.towns.list.find(instance => instance.name === record.city_name)
                            if (town === undefined) {
                                // console.log(record.city_name + ' : city is created')
                                this.$app.service('towns').create({ name: record.city_name, town_related_province: province._id })
                                console.log(record.city_name + ' -> added')
                                this.sleep(3000)
                            }
                            this.value = this.value + step
                        })
                    }
                }) */
            },
            trigger: function () {
                this.$refs.avatar.click()
            },
            back: function () {
                this.errors = []
            },
            showLoading () {
                this.loading = true
            },
            hideLoading () {
                this.loading = false
            },
            getProvinceId: function (name) {
                let id = this.$store.state.provinces.list.find(instance => instance.name === name)
                if (id !== undefined) {
                    return id._id
                }
                return ''
            }
        }
    }
</script>

<style scoped>
    .card.card--flat {
        min-height: 250px;
    }
    .upload-content {
        text-align: center;
        padding: 40px 20px;
    }
    #avatar {
        display: none
    }
    nav.review {
        width: 50%;
        margin-left: 25%;
    }
    .review.toolbar {
        border-radius: 50px;
    }
    .sheet-name {
        margin-left: 36px;
    }
</style>