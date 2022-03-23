<template>
  <div>
    <h2 class="text-center text-uppercase mb-3">Annual examination result</h2>
    <v-divider></v-divider>
    <div v-if="loading" class="text-center loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div class="mt-3" v-else>
      <v-row>
        <v-col>
          <v-select
            dense
            label="Select class"
            :items="classes"
            outlined
            :disabled="loading"
            v-model="selectedClass"
            @change="getStudents"
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="selectedClass">
        <v-col cols="6">
          <v-text-field
            outlined
            type="tel"
            label="Admission number"
            :rules="rules.adno"
            v-model="student.adno"
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-menu
            v-if="$vuetify.breakpoint.mdAndUp"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                dense
                outlined
                :value="formattedDate"
                label="Birthday date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="student.dob"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="saveDate"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            v-else
            outlined
            type="date"
            label="Date of birth"
            v-model="student.dob"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        v-if="canSubmit"
        color="primary"
        :loading="submitLoading"
        :disabled="submitLoading"
        @click="submit"
        >Submit</v-btn
      >

      <v-snackbar v-model="snackbar">
        {{ notificationText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
export default {
  name: 'IndexPage',
  head: {
    title: 'Welcome to Exam results portal',
  },
  data() {
    return {
      loading: false,
      selectedClass: null,
      rules: {
        adno: [
          (value) => !!value || 'Required.',
          (value) => (value && value.length >= 3) || 'Min 3 characters',
        ],
      },
      activePicker: null,
      menu: false,
      student: {
        adno: null,
        dob: null,
      },
      submitLoading: false,
      notificationText: '',
      snackbar: false,
    }
  },
  computed: {
    classes() {
      return this.$store.state.classes
        ? this.$store.state.classes.map((cls) => ({
            value: cls.googleSheetKey,
            text: cls.name + cls.division,
          }))
        : []
    },
    students() {
      return this.$store.state.students.students
    },
    subjects() {
      return this.$store.state.subjects.subjects
    },
    attendance() {
      return this.$store.state.subjects.attendance
    },
    formattedDate() {
      if (this.student.dob) {
        return moment(this.student.dob).format('MM-DD-YYYY')
      }
    },
    canSubmit() {
      return this.selectedClass && this.student.adno && this.student.dob
    },
  },
  methods: {
    getClasses() {
      this.loading = true
      this.$axios
        .$get(
          `https://sheets.googleapis.com/v4/spreadsheets/110r1YeIYb8hOS_ueVc1FP8I25UdsjStQjtKt1Ssd3CU/values/Sheet1/?alt=json&key=AIzaSyCu9K5TmEi0QFQKO2zLsq23DjbiU7unbrs`
        )
        .then((resp) => {
          this.$store.commit('setClasses', resp)
        })
        .catch((err) => console.error(err))
        .finally(() => (this.loading = false))
    },
    getStudents(id) {
      if (id) {
        this.loading = true

        this.$store.commit('selectClass', id)

        this.$axios
          .$get(
            `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Students/?alt=json&key=AIzaSyCu9K5TmEi0QFQKO2zLsq23DjbiU7unbrs`
          )
          .then((resp) => {
            this.$store.commit('students/setStudents', resp)
            return this.$axios.$get(
              `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Subjects/?alt=json&key=AIzaSyCu9K5TmEi0QFQKO2zLsq23DjbiU7unbrs`
            )
          })
          .then((resp) => {
            this.$store.commit('subjects/setSubjects', resp)
            return this.$axios.$get(
              `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Attendance/?alt=json&key=AIzaSyCu9K5TmEi0QFQKO2zLsq23DjbiU7unbrs`
            )
          })
          .then((resp) => {
            this.$store.commit('subjects/setAttendance', {
              data: resp.values,
            })
            return this.$axios.$get(
              `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Marks/?alt=json&key=AIzaSyCu9K5TmEi0QFQKO2zLsq23DjbiU7unbrs`
            )
          })
          .then((resp) => {
            this.$store.commit('marks/setMarksRows', {
              students: this.students,
              subjects: this.subjects,
              attendance: this.attendance,
              data: resp.values,
            })
          })
          .catch((err) => console.error(err))
          .finally(() => (this.loading = false))
      }
    },
    saveDate(date) {
      this.$refs.menu.save(date)
    },
    submit() {
      if (this.student.adno && this.student.dob) {
        this.submitLoading = true
        const student = this.$store.state.students.students.find(
          (student) =>
            student.adno == this.student.adno && student.dob == this.student.dob
        )

        if (student) {
          this.$store.commit('marks/setStudent', student)
          this.$router.push({ path: '/view-result/summary' })
        } else {
          this.notificationText = 'Unable to find the student'
          this.snackbar = true
        }

        this.submitLoading = false
      }
    },
  },
  created() {
    this.getClasses()
  },
}
</script>

<style>
.loader {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>