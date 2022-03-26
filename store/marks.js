import { Marks } from '~/models/marks'
import { SubjectStudent } from '~/models/subject'
import Vue from 'vue'

export const state = () => ({
  marks: [],
  selectedStudent: null,
})

export const mutations = {
  async setMarksRows(state, payload) {
    const students = payload.students
    const subjects = payload.subjects
    const attendance = payload.attendance
    const rows = payload.data

    let marksList = []
    let subjectStudentList = []

    let row = 1

    if (students && students.length) {
      for (const student of students) {
        let markCol = 2
        let col = 2
        subjectStudentList = []

        if (subjects && subjects.length) {
          for (const subject of subjects) {
            subjectStudentList.push(
              new SubjectStudent(
                student,
                subject,
                parseInt(rows[row][markCol]),
                parseInt(rows[row][markCol + 1]),
                attendance[row][col]
              )
            )

            markCol += 2
            col++
          }
        }

        marksList.push(
          new Marks(
            student.adno,
            subjectStudentList,
            rows[row][markCol],
            rows[row][markCol + 1],
            rows[row][markCol + 2],
            rows[row][markCol + 3],
            parseInt(rows[row][markCol + 4])
          )
        )
        row++
      }
    }

    state.marks = marksList
    await this.$localForage.setItem('marks', state.marks)
  },
  setMarks(state, marks) {
    state.marks = marks
  },
  setStudent(state, student) {
    state.selectedStudent = student
  },
}
