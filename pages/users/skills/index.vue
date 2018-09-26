<template>
  <div>
    <v-container>
      <v-card-title>
        <div class="buttons">
          <v-btn color="success" dark v-on:click="navigate('Import-Skills')">Import</v-btn>
          <v-btn color="pink" dark>Export</v-btn>
          <v-btn color="cyan" dark v-on:click="navigate('/users/skills/form')">New Skill</v-btn>
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
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.skill_user_username }}</td>
          <td>
            <v-btn flat icon color="orange" class="tools-button" v-on:click="navigate('/users/skills/form?id=' + props.item._id)">
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
        title: 'Skills',
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        selected: [],
        headers: [
          { text: 'ID', value: '_id', align: 'left' },
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'Description', value: 'description', align: 'left' },
          { text: 'Skill User', value: 'skill_user', align: 'left' },
          { value: '' }
        ],
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        skill_states: []
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
          this.$data.skill_states = this.$store.state.skills.list
          this.$data.skill_states.forEach(skill => {
            skill.skill_user_username = this.getUsername(skill.skill_user)
          })
          return this.$data.skill_states
        } else {
          return []
        }
      }
    },
    mounted: function () {
      this.$store.commit('setTitle', this.title)
    },
    methods: {
      navigate: function (path) {
        this.$router.push(path)
      },
      getUsername: function (id) {
        return this.$store.state.users.list.find(element => element._id === id).username
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
            this.$store.commit('skills/remove', id)
            console.log(this.items[index])
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
