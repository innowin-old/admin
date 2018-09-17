<template>
  <div>
    <v-container>
      <v-card-title>
        <div class="buttons">
          <v-btn color="success" dark v-on:click="navigate('Import-Users')">Import</v-btn>
          <v-btn color="pink" dark>Export</v-btn>
          <v-btn color="cyan" dark v-on:click="navigate('/users/form')">New User</v-btn>
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
        v-bind:items="items"
        v-bind:search="search"
        v-bind:pagination.sync="pagination"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item._id }}</td>
          <td>{{ props.item.username }}</td>
          <td>{{ props.item.first_name }}</td>
          <td>{{ props.item.last_name }}</td>
          <td>{{ props.item.public_email }}</td>
          <td>
            <v-btn flat icon color="orange" class="tools-button" v-on:click="navigate('/users/form?id=' + props.item._id)">
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
  export default {
    data: function () {
      return {
        title: 'Users',
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        selected: [],
        headers: [
          { text: 'ID', value: '_id', align: 'left' },
          { text: 'Username', value: 'username', align: 'left' },
          { text: 'First Name', value: 'first_name', align: 'left' },
          { text: 'Last Name', value: 'last_name', align: 'left' },
          { text: 'Email', value: 'email', align: 'left' },
          { value: '' }
        ],
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.items.length / this.pagination.rowsPerPage)
      },
      items: function () {
        if (typeof this.$store !== 'undefined') {
          return this.$store.state.users.list
        } else {
          return []
        }
      }
    },
    sockets: {
      organizationsResult: function (val) {
        this.items = val
      }
    },
    mounted: function () {
      this.$store.commit('setTitle', this.title)

      this.$app.service('users').find({}).then(users => {
        // this.items = users.data
        this.$store.commit('users/get', users.data)
        console.log(users.data)
      })
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
            this.$store.commit('users/remove', id)
            console.log(this.items[index])
            /* this.$delete(this.items, index)
            this.items.splice(index) */
            this.$swal(
              'خذف شد!',
              'رکورد مورد نظر شما با موفقیت حذف شد.',
              'success'
            )
          }
        })
      }
    }
  }
</script>

<style>
  .buttons {
    padding-top: 18px;
  }
  .buttons .btn:first-child {
    margin-left: 0;
  }
</style>
