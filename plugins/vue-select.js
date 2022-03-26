import Vue from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import moment from 'moment'

Vue.component('vue-select', vSelect)

Vue.mixin({
  methods: {
    formatDate(date, format = 'DD-MM-YYYY') {
      if (date) {
        return moment(date).format(format)
      }
    },
  },
})
