<template>


    <div>
        <v-container>
            <v-card-title>
                <div class="buttons">
                    <v-btn color="success" dark v-on:click="navigate('Import-Towns')">Import</v-btn>
                    <v-btn color="pink" dark>Export</v-btn>
                    <v-btn color="cyan" dark v-on:click="navigate('/gis/towns/form')">New Town</v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    v-bind:headers="headers"
                    v-bind:items="town_states"
                    v-bind:search="search"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item._id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.code }}</td>
                    <td> {{props.item.town_related_province_name}} </td>
                    <td>
                        <v-btn flat icon color="orange" class="tools-button" v-on:click="navigate('/gis/towns/form?id=' + props.item._id)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn flat icon color="red" dark class="tools-button" v-on:click="deleteRecord(props.item._id, props.index)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </v-container>
    </div>



</template>

<script>
    /* eslint-disable indent */

    export default {
        data: function () {
            return {
                title: 'Towns',
                search: '',
                pagination: {
                    rowsPerPage: 10
                },
                selected: [],
                headers: [
                    { text: 'ID', value: '_id', align: 'left' },
                    { text: 'Name', value: 'name', align: 'left' },
                    { text: 'Code', value: 'code', align: 'left' },
                    { text: 'Country', value: 'town_related_province_name', align: 'left' },
                    { value: '' }
                ],
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
                town_states: []
            }
        },
        methods: {
            navigate: function (path) {
                this.$router.push(path)
            },
            deleteRecord: function (id, index) {
                this.$swal({
                    title: 'آیا مطمئنید که رکورد حذف شود ؟',
                    text: 'رکورد پس از حذف قابل بازگشت نخواهد بود',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'بله، آن را حذف کن',
                    cancelButtonText: 'لغو'
                }).then((result) => {
                    if (result.value) {
                        this.$store.commit('towns/remove', id)
                        this.$swal(
                            'خذف شد!',
                            'رکورد مورد نظر شما با موفقیت حذف شد.',
                            'success'
                        )
                    }
                })
            },
            getTownName: function (id) {
                const province = this.$store.state.provinces.list.find(instance => instance._id === id)
                if (province !== undefined) {
                    return province.name
                } else {
                    return ''
                }
            },
            setTowns: function () {
                this.$data.town_states = this.$store.state.towns.list
                this.$data.town_states.forEach(town => {
                    town.town_related_province_name = this.getTownName(town.town_related_province)
                })
            }
        },
        computed: {
            pages () {
                if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0

                return Math.ceil(this.town_states.length / this.pagination.rowsPerPage)
            }
        },
        mounted: function () {
            this.$store.commit('setTitle', this.title)
            this.setTowns()
        }
    }
</script>

<style scoped>

</style>