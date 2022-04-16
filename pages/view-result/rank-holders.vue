<template>
  <div>
    <div class="mb-3 rank-holder-wrapper">
      <rank-holder
        class="rank-holder"
        v-for="(student, i) in rankHolders"
        :key="i"
        :student="student"
      ></rank-holder>
    </div>

    <promoted-students></promoted-students>
  </div>
</template>

<script>
import results from '../../mixins/results'
export default {
  layout: 'dashboard',
  mixins: [results],
  computed: {
    rankHolders() {
      const ranks = [1, 2, 3]
      const studentAdnos = this.marksList
        ? this.marksList
            .filter((markList) => ranks.includes(markList.rank))
            .map((item) => item.adno)
        : []

      if (studentAdnos) {
        let students = this.$store.state.students.students?.filter((student) =>
          studentAdnos.includes(student.adno)
        )

        if (students) {
          for (const student of students) {
            student.marks = this.marksList.find(
              (markList) => markList.adno == student.adno
            )
          }

          students.sort((a, b) => {
            if (a.marks.rank > b.marks.rank) {
              return 1
            }

            if (b.marks.rank > a.marks.rank) {
              return -1
            }

            return 0
          })
          return students
        }
      }
    },
  },
}
</script>

<style scoped>
.rank-holder-wrapper {
  display: flex;
  flex-wrap: wrap;
}
@media screen and (max-width: 600px) {
  .rank-holder-wrapper {
    display: block;
  }
}
</style>