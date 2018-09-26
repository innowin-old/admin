<template>
  <div>
    <v-container>
      <v-card-title>
        <div class="buttons">
          <v-btn color="success" dark v-on:click="navigate('Import-Educations')">Import</v-btn>
          <v-btn color="pink" dark>Export</v-btn>
          <v-btn color="cyan" dark v-on:click="navigate('/users/educations/form')">New Education</v-btn>
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
        v-bind:items="education_states"
        v-bind:search="search"
        v-bind:pagination.sync="pagination"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item._id }}</td>
          <td>{{ props.item.grade }}</td>
          <td>{{ props.item.university }}</td>
          <td>{{ props.item.field_of_study }}</td>
          <td>{{ props.item.education_user_username }}</td>
          <td>
            <v-btn flat icon color="orange" class="tools-button" v-on:click="navigate('/users/educations/form?id=' + props.item._id)">
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
        title: 'Educations',
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        selected: [],
        headers: [
          { text: 'ID', value: '_id', align: 'left' },
          { text: 'Grade', value: 'grade', align: 'left' },
          { text: 'University', value: 'university', align: 'left' },
          { text: 'Field Of Study', value: 'field_of_study', align: 'left' },
          { text: 'Education User', value: 'education_user_username', align: 'left' },
          { value: '' }
        ],
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        education_states: []
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.education_states.length / this.pagination.rowsPerPage)
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
            this.$store.commit('educations/remove', id)
            this.$swal(
              'خذف شد!',
              'رکورد مورد نظر شما با موفقیت حذف شد.',
              'success'
            )
          }
        })
      },
      getUsername: function (id) {
        return this.$store.state.users.list.find(element => element._id === id).username
      },
      setEducations: function () {
        this.$data.education_states = this.$store.state.educations.list
        this.$data.education_states.forEach(education => {
          education.education_user_username = this.getUsername(education.education_user)
        })
      }
    },
    mounted: function () {
      this.$store.commit('setTitle', this.title)
      this.setEducations()
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
