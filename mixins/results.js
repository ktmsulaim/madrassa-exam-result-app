import moment from 'moment'

export default {
  computed: {
    selectedClass() {
      return this.$store.state.selectedClass
    },
    student() {
      return this.$store.state.marks.selectedStudent
    },
    marks() {
      return this.$store.state.marks.marks.find(
        (mark) => mark.adno == this.student.adno
      )
    },
  },
  methods: {
    formatDate(date, format = 'DD-MM-YYYY') {
      if (date) {
        return moment(date).format(format)
      }
    },
  },
  created() {
    const student = this.$store.state.marks.selectedStudent

    if (!student) {
      this.$router.push({ path: '/' })
    }
  },
}
