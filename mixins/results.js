export default {
  data() {
    return {
      student: null,
      marksList: [],
      selectedClass: null,
    }
  },
  computed: {
    marks() {
      if (this.student) {
        const marks = this.marksList.find((ml) => ml.adno == this.student.adno)
        return marks
      }
    },
  },
  async created() {
    const student =
      this.$store.state.marks.selectedStudent ||
      (await this.$localForage.getItem('selectedStudent'))
    if (!student) {
      this.$router.push({ path: '/' })
    }

    this.student = student

    this.marksList = await this.$localForage.getItem('marks')
    this.selectedClass = await this.$localForage.getItem('selectedClass')

    let students = this.$store.state.students.students

    if (!students) {
      students = await this.$localForage.getItem('students')
      this.$store.commit('students/setStudentsModel', students)
    }

    await this.$nextTick()
  },
}
