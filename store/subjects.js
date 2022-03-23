import { Subject } from '~/models/subject'

export const state = () => ({
  subjects: [],
  attendance: [],
})

export const mutations = {
  setSubjects(state, data) {
    const rows = data.values
    const subjectList = []

    if (rows) {
      rows.forEach((row, index) => {
        if (index > 0) {
          subjectList.push(
            new Subject(
              row[0],
              row[1],
              parseInt(row[2]),
              parseInt(row[3]),
              parseInt(row[4])
            )
          )
        }
      })
    }

    state.subjects = subjectList
  },
  setAttendance(state, payload) {
    state.attendance = payload.data
  },
}
