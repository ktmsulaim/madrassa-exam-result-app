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
  </div>
</template>

<script>
export default {
  props: ['student'],
}
</script>

<style>
.adno {
  color: #444;
  background: #f9f9f9;
  padding: 5px;
}

.adno b {
  margin-right: 8px;
}

@media screen and (max-width: 600px) {
  .adno b {
    display: block;
  }
}
</style>