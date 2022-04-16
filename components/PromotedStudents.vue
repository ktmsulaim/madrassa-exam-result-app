<template>
  <div class="my-5">
    <p class="text-button">Promoted students</p>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>AD.NO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in promotedStudents" :key="index">
            <td>{{ student.rank }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.adno }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  computed: {
    promotedStudents() {
      const marksLists = this.$store.state.marks.marks

      if (marksLists) {
        const promotedML = marksLists.filter((marksList) => {
          return marksList.promoted == 1
        })

        if (promotedML) {
          promotedML.sort((a, b) => {
            if (a.rank > b.rank) {
              return 1
            }

            if (b.rank > a.rank) {
              return -1
            }

            return 0
          })

          for (const promoted of promotedML) {
            promoted.name = this.$store.state.students.students?.find(
              (std) => std.adno == promoted.adno
            ).name
          }
        }

        return promotedML
      }
    },
  },
}
</script>

<style>
</style>