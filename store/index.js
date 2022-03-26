import { Class } from '~/models/class'

export const store = () => ({
  classes: [],
  classesForSelect: [],
  selectedClass: null,
})

export const mutations = {
  setClasses(state, data) {
    const rows = data.values
    const classList = []
    if (rows) {
      rows.forEach((row, index) => {
        if (index > 0) {
          classList.push(
            new Class(row[0], row[1], row[2], row[3], parseInt(row[4]))
          )
        }
      })
    }
    state.classes = classList
    state.classesForSelect = classList
      .filter((item) => item.publish === 1)
      .map((cls) => ({
        text: cls.name + cls.division,
        value: cls.googleSheetKey,
        disabled: !cls.publish,
      }))
  },
  async selectClass(state, sheetId) {
    if (state.classes && state.classes.length) {
      state.selectedClass = state.classes.find(
        (cls) => cls.googleSheetKey == sheetId
      )

      await this.$localForage.setItem('selectedClass', state.selectedClass)
    }
  },
  setClass(state, cls) {
    state.selectedClass = cls
  },
}
