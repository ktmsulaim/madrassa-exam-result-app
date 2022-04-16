<template>
  <div
    class="text-center pa-5 rounded-lg student-avatar mr-2"
    :class="{ active: isLoggedInStudent }"
  >
    <v-avatar size="60">
      <img
        v-if="student.gender == 'male'"
        src="~/assets/man-muslim.svg"
        alt="alt"
      />
      <img
        v-else-if="student.gender == 'female'"
        src="~/assets/woman-muslim.svg"
        alt="alt"
      />
    </v-avatar>
    <div class="rank-holder-name" v-if="student">{{ student.name }}</div>
    <div class="text-caption" v-if="student">{{ student.adno }}</div>

    <div class="mt-2 d-flex justify-space-between align-center">
      <div>
        <b>Rank: </b><span>{{ student.marks.rank }}</span>
      </div>
      <div>
        <b>Marks: </b> <span>{{ student.marks.totalMarks }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['student'],
  computed: {
    isLoggedInStudent() {
      if (this.$store.state.marks.selectedStudent) {
        return this.$store.state.marks.selectedStudent.adno == this.student.adno
      }
      return false
    },
  },
}
</script>

<style>
.student-avatar {
  flex: 6;
  background-color: #f9f9f9;
}

.student-avatar.active {
  background-color: #444;
  color: #fff;
}

.rank-holder-name {
  text-transform: uppercase;
  font-weight: 600;
  margin: 5px 0;
}

@media screen and (max-width: 920px) {
  .student-avatar {
    margin-top: 10px;
  }
}
</style>