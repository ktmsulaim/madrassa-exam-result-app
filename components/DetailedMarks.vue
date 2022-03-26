<template>
  <div>
    <table v-if="$vuetify.breakpoint.mdAndUp" class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Attendance</th>
          <th>Marks</th>
          <th>Grace marks</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ formatDate(mark.subject.examDate) }}</td>
          <td>{{ isPublished ? attendance : 'N/A' }}</td>
          <td>{{ isPublished ? mark.marks : 'N/A' }}</td>
          <td>{{ isPublished ? mark.graceMarks : 'N/A' }}</td>
          <td>{{ isPublished ? mark.marks + mark.graceMarks : 'N/A' }}</td>
          <td>
            {{ isPublished ? (hasPassed ? 'Passed' : 'Failed') : 'N/A' }}
          </td>
        </tr>
      </tbody>
    </table>
    <v-list-item-group v-else>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Date</v-list-item-title>
          <v-list-item-subtitle>{{
            formatDate(mark.subject.examDate)
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Attendance</v-list-item-title>
          <v-list-item-subtitle>{{
            isPublished ? attendance : 'N/A'
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Marks</v-list-item-title>
          <v-list-item-subtitle>{{
            isPublished ? mark.marks : 'N/A'
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Grace marks</v-list-item-title>
          <v-list-item-subtitle>{{
            isPublished ? mark.graceMarks : 'N/A'
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Total</v-list-item-title>
          <v-list-item-subtitle>{{
            isPublished ? mark.marks + mark.graceMarks : 'N/A'
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Status</v-list-item-title>
          <v-list-item-subtitle>{{
            isPublished ? (hasPassed ? 'Passed' : 'Failed') : 'N/A'
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
export default {
  props: ['mark'],
  computed: {
    isPublished() {
      return this.mark.subject.publish === 1
    },
    hasPassed() {
      return (
        this.mark.marks + this.mark.graceMarks >= this.mark.subject.passMarks
      )
    },
    attendance() {
      let att = 'N/A'

      if (this.mark.attended == 'P') {
        att = 'Present'
      } else if (this.mark.attended == 'M') {
        att = 'Medical'
      } else if (this.mark.attended == 'A') {
        att = 'Absent'
      }

      return att
    },
  },
}
</script>

<style>
</style>