<template>
  <div v-if="student">
    <student-details :student="student"></student-details>

    <div v-if="marks" class="mt-3">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(mark, index) in marks.studentSubjects"
          :key="index"
        >
          <v-expansion-panel-header>
            {{ mark.subject.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <detailed-marks :mark="mark"></detailed-marks>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="mt-3">
        <div class="statistics">
          <b>Total possible marks:</b> <span>{{ totalPossibleMarks }}</span>
        </div>
        <div class="statistics">
          <b>Marks:</b> <span>{{ marks.totalMarks }}</span>
        </div>
        <div class="statistics">
          <b>Percentage:</b> <span>{{ marks.percentage }}%</span>
        </div>
        <div class="statistics">
          <b>Number of students:</b> <span>{{ marksList.length }}</span>
        </div>
        <div class="statistics">
          <b>Rank:</b> <span>{{ marks.rank }}</span>
        </div>
        <div class="statistics">
          <b>Number of working days:</b>
          <span v-if="selectedClass">{{ selectedClass.workingDays }}</span>
        </div>
        <div class="statistics">
          <b>Attendance:</b>
          <span>{{ marks.attendance }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import result from '../../mixins/results'
export default {
  name: 'DetailedResults',
  head: {
    title: 'Detailed results',
  },
  layout: 'dashboard',
  mixins: [result],
  computed: {
    totalPossibleMarks() {
      let marks = 0

      for (const subject of this.marks.studentSubjects) {
        marks += subject.subject.maxMarks
      }

      return marks
    },
  },
  methods: {
    formatDate(date) {
      if (date) {
        return moment(date).format('DD-MM-YYYY')
      }
    },
  },
}
</script>

<style>
.statistics {
  padding: 8px;
  background: #f9f9f9;
  border-bottom: 1px solid #efefef;
}
</style>