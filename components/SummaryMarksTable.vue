<template>
  <div class="my-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Subject</th>
          <th>Marks</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mark, i) in marks.studentSubjects" :key="i">
          <td>{{ formatDate(mark.subject.examDate) }}</td>
          <td>{{ mark.subject.name }}</td>
          <td>
            {{ mark.subject.publish ? mark.marks + mark.graceMarks : 'N/A' }}
          </td>
          <td>
            {{
              mark.subject.publish
                ? mark.marks + mark.graceMarks >= mark.subject.passMarks
                  ? 'Passed'
                  : 'Failed'
                : 'N/A'
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['marks'],
  computed: {},
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
.table {
  border-collapse: collapse;
  width: 100%;
  border: 2px solid #444;
}

.table td,
.table th {
  padding: 10px;
}

.table th {
  background: #444;
  color: #fff;
  text-align: left;
}
</style>