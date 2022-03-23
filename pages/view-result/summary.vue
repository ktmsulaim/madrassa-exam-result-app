<template>
  <div>
    <h3 class="mb-3">{{ student.name }}</h3>
    <div class="adno d-flex justify-space-between align-center">
      <div>
        <b>Admission Number</b>
        <span class="mr-2">{{ student.adno }}</span>
      </div>
      <div>
        <b>Date of birth</b>
        <span>{{ formatDate(student.dob) }}</span>
      </div>
    </div>
    <summary-marks-table :marks="marks"></summary-marks-table>
    <div class="my-3">
      <v-row justify="end">
        <v-col cols="4">
          <div class="total d-flex justify-space-between">
            <b>Total</b>
            <span>{{ marks.totalMarks }}</span>
          </div>
          <div class="total d-flex justify-space-between">
            <b>Rank</b>
            <span>{{ marks.rank }}</span>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import result from '../../mixins/results'

export default {
  layout: 'dashboard',
  mixins: [result],
}
</script>

<style lang="scss">
.adno {
  color: #444;
  background: #f9f9f9;
  padding: 5px;
}

.adno b {
  margin-right: 8px;
}

.total {
  margin-bottom: 5px;
  font-size: 1rem;
  text-transform: uppercase;
}

.total b {
  margin-right: 15px;
}

@media screen and (max-width: 600px) {
  .adno b {
    display: block;
  }
}
</style>