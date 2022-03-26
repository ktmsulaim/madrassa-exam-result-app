<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="(link, i) in links" :key="i" nuxt :to="link.path">
          {{ link.text }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="3" v-if="selectedClass">
            <v-sheet rounded="lg" class="pa-3">
              <div class="class-with-division">
                <span>{{ selectedClass.name + selectedClass.division }}</span>
              </div>
              <div>
                <b>Teacher</b>
                <p>{{ selectedClass.teacher }}</p>
              </div>
              <div class="mt-2 text-center">
                <v-btn @click="logout" plain color="error">Logout</v-btn>
              </div>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="6">
            <v-sheet class="pa-5" rounded="lg">
              <Nuxt />
            </v-sheet>
            <div class="mt-2 text-sm" id="footer">
              &copy; Izzathul Islam Higher Secondary Madrassa
              <span>{{ year }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import result from '../mixins/results'

export default {
  name: 'DashboardLayout',
  mixins: [result],
  data() {
    return {
      links: [
        {
          path: '/view-result/summary',
          text: 'Summary',
        },
        {
          path: '/view-result/detailed',
          text: 'Detailed',
        },
        {
          path: '/view-result/rank-holders',
          text: 'Rank Holders',
        },
      ],
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
  methods: {
    async logout() {
      await this.$localForage.clear()
      this.$router.push({ path: '/' })
    },
  },
  async mounted() {
    const student = await this.$localForage.getItem('selectedStudent')
    if (student) {
      this.$store.commit('marks/setStudent', student)
    }
  },
}
</script>

<style>
body {
  color: #444;
  font-size: 0.85rem;
  background: #f9f9f9;
  padding: 8px;
}

#footer {
  font-size: 13px;
  text-align: center;
  margin-top: 15px;
}

.class-with-division {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.class-with-division span {
  background: #f9f9f9;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 15px;
}
</style>