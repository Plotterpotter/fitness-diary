<template>
  <div class="flex flex-col">
    <p class="font-bold text-2xl ml-3">Training vom {{ training.date }}</p>
    <div class="flex flex-col border-2 border-dashed m-2">
      <DoneExercise
        v-for="doneExercise in training.exercises"
        :key="JSON.stringify(doneExercise)"
        :doneExercise="doneExercise"
      />
    </div>
  </div>
</template>

<script setup>
import DoneExercise from "./DoneExercise";

defineProps({
  training: Object,
});
</script>
