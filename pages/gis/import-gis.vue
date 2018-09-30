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
    /* eslint-disable indent,camelcase */
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
                text: ''
            }
        },
        methods: {
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
                        console.log(json_object)
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
                this.loading = true
                var body = {
                    url: 'http://restful.daneshboom.ir/organizations/import_organizations/',
                    method: 'post',
                    result: 'uploadOrganizationsResult',
                    data: {
                        records: this.sheets[sheet].jsonString
                    }
                }
                console.log(body)
                /* this.$socket.emit('rest request', body) */
            },
            trigger: function () {
                this.$refs.avatar.click()
            },
            back: function () {
                this.errors = []
            }
        }/* ,
        sockets: {
            uploadOrganizationsResult: function (result) {
                console.log(result)
                this.loading = false
                this.errors = result.errors
            }
        } */
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