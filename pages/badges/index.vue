<template>
  <div>
    <v-container>
      <v-card-title>
        <div class="buttons">
          <v-btn color="success" dark v-on:click="navigate('Import-Badges')">Import</v-btn>
          <v-btn color="pink" dark>Export</v-btn>
          <v-btn color="cyan" dark v-on:click="navigate('/badges/form')">New Badge</v-btn>
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
          <td>{{ props.item.badge_related_badge_category_name }}</td>
          <td>{{ props.item.badge_related_parent }}</td>
          <td>{{ props.item.badge_active }}</td>
          <td>
            <v-btn flat icon color="orange" class="tools-button" v-on:click="navigate('/badges/form?id=' + props.item._id)">
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
        title: 'Badges',
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        selected: [],
        headers: [
          { text: 'ID', value: '_id', align: 'left' },
          { text: 'Badge Category', value: 'badge_related_badge_category', align: 'left' },
          { text: 'Related Parent', value: 'badge_related_parent', align: 'left' },
          { text: 'Related Parent Service', value: 'badge_related_parent_service', align: 'left' },
          { text: 'Badge Active', value: 'badge_active', align: 'left' },
          { value: '' }
        ],
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        badge_states: []
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
          this.$data.badge_states = this.$store.state.badges.list
          this.$data.badge_states.forEach(badge => {
            badge.badge_related_badge_category_name = this.getBadgeCategoryName(badge.badge_related_badge_category)
          })
          return this.$data.badge_states
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
            this.$store.commit('badges/remove', id)
            console.log(this.items[index])
            this.$swal(
              'خذف شد!',
              'رکورد مورد نظر شما با موفقیت حذف شد.',
              'success'
            )
          }
        })
      },
      getBadgeCategoryName: function (id) {
        return this.$store.state['badge-categories'].list.find(element => element._id === id).text
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
