<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col sm="12" md="8" lg="6">
            <v-sheet class="pa-5" rounded="lg">
              <Nuxt />
            </v-sheet>
            <div class="mt-2 text-sm" id="footer">
              &copy; Izzathul Islam Madrassa <span>{{ year }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style>
#footer {
  font-size: 13px;
  text-align: center;
  margin-top: 15px;
}
</style>