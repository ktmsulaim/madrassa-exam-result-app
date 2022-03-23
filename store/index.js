import { Class } from '~/models/class'

export const store = () => ({
  classes: [],
  selectedClass: null,
})

export const mutations = {
  setClasses(state, data) {
    const rows = data.values
    const classList = []
    if (rows) {
      rows.forEach((row, index) => {
        if (index > 0) {
          classList.push(new Class(row[0], row[1], row[2], row[3], row[4]))
        }
      })
    }
    state.classes = classList
  },
  selectClass(state, sheetId) {
    if (state.classes && state.classes.length) {
      state.selectedClass = state.classes.find(
        (cls) => cls.googleSheetKey == sheetId
      )
    }
  },
}