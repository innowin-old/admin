<template>
  <div>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
          <v-list-group
            v-for="item in items"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.action"
            no-action
          >
            <v-list-tile slot="activator" :to="item.to">
              <v-list-tile-action>
                <v-icon v-if="item.icon" color="pink">{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to"
              v-if="item.items"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon 
        @click="drawer = !drawer"
        v-if="token"
      ></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
        v-if="token"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
        v-if="token"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
        v-if="token"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
        v-if="token"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      v-if="token"
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
    /* eslint-disable indent */

    export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Dashboard', to: '/' },
          { icon: 'bubble_chart',
            title: 'Users',
            to: '/users/',
            items: [
              { title: 'Agent Requests', to: '/users/user-agent-requests/' },
              { title: 'Educations', to: '/users/educations' },
              { title: 'Researches', to: '/users/researches' },
              { title: 'Skills', to: '/users/skills/' },
              { title: 'Urls', to: '/users/urls/' },
              { title: 'Articles', to: '/users/articles/' }
            ]
          },
          { icon: 'apps',
            title: 'Badges',
            to: '/badges/',
            items: [
              { title: 'Badge Categories', to: '/badges/badge-categories/' }
            ]
          },
          { icon: 'apps', title: 'Certificates', to: '/certificates/' },
          { icon: 'business',
            title: 'Organizations',
            to: '/organizations/',
            items: [
              { title: 'Abilities', to: '/organizations/abilities' },
              { title: 'Confirmations', to: '/organizations/confirmations' },
              { title: 'Customers', to: '/organizations/customers' },
              { title: 'Followers', to: '/organizations/followers' },
              { title: 'Pictures', to: '/organizations/pictures' },
              { title: 'Staffs', to: '/organizations/staffs' }
            ]
          },
          { icon: 'swap_vert',
            title: 'Exchanges',
            to: '/exchanges/',
            items: [
              { title: 'Members', to: '/exchange-members' }
            ]
          },
          { icon: 'devices',
            title: 'Products',
            to: '/products/',
            items: [
              { title: 'Categories', to: '/products/categories' },
              { title: 'Category Fields', to: '/products/category-fields' },
              { title: 'Comments', to: '/products/comments' },
              { title: 'Pictures', to: '/products/pictures' },
              { title: 'Prices', to: '/products/prices' }
            ]
          },
          {
              icon: 'call_split',
              title: 'GIS',
              to: '/gis/countries',
              items: [
                  { title: 'Countries', to: '/gis/countries' },
                  { title: 'Provinces', to: '/gis/provinces' },
                  { title: 'Towns', to: '/gis/towns' }
              ]
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    computed: {
      title: function () {
        return this.$store.state.title
      },
      token: function () {
        return this.$store.state.token
      }
    }
  }
</script>
