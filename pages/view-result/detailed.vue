<template>
  <div v-if="student">
    <p>Coming soon</p>
    <!-- <div v-if="selectedClass">
      <p><b>Class:</b> {{ selectedClass.name }}</p>
      <p><b>Division:</b> {{ selectedClass.division }}</p>
      <p><b>Teacher:</b> {{ selectedClass.teacher }}</p>
    </div>
    <h3>{{ student.name }}</h3>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grace marks</th>
            <th>Total</th>
            <th>Attendance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mark, i) in marks.studentSubjects" :key="i">
            <td>{{ formatDate(mark.subject.examDate) }}</td>
            <td>{{ mark.subject.name }}</td>
            <td>{{ mark.marks }}</td>
            <td>{{ mark.graceMarks }}</td>
            <td>{{ parseInt(mark.marks) + parseInt(mark.graceMarks) }}</td>
            <td>{{ mark.attended }}</td>
            <td>Passed</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->
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
</style>