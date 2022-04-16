import { Student } from '~/models/student'

export const store = () => ({
  students: [],
})

export const mutations = {
  async setStudents(state, data) {
    const rows = data.values
    const studentsList = []

    if (rows) {
      rows.forEach((row, index) => {
        if (index > 0) {
          studentsList.push(
            new Student(row[0], parseInt(row[1]), row[2], row[3])
          )
        }
      })
    }
    state.students = studentsList
    await this.$localForage.setItem('students', state.students)
  },

  setStudentsModel(state, data) {
    state.students = data
  },
}
