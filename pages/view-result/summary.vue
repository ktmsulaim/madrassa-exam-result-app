<template>
  <div v-if="student">
    <student-details :student="student"></student-details>
    <summary-marks-table v-if="marks" :marks="marks"></summary-marks-table>
    <div class="my-3" v-if="marks">
      <v-row justify="end">
        <v-col lg="5" md="7" sm="12">
          <div class="total d-flex justify-space-between">
            <b>Total</b>
            <span>{{ marks.totalMarks }}</span>
          </div>
          <div class="total d-flex justify-space-between">
            <b>Rank</b>
            <span>{{ marks.rank }}</span>
          </div>
          <div class="total d-flex justify-space-between">
            <b>Result</b>
            <span
              class="text-caption"
              :class="{
                'red--text': !marks.promoted,
                'green--text': marks.promoted,
              }"
              >{{ marks.promoted ? 'Promoted' : 'Not promoted' }}</span
            >
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
.total {
  margin-bottom: 5px;
  font-size: 1rem;
  text-transform: uppercase;
}

.total b {
  margin-right: 15px;
}
</style>