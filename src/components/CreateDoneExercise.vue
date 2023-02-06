<template>
  <IonCard>
    <ion-item>
      <ion-label position="stacked">Übung</ion-label>
      <ion-select v-model="doneExercise.exercise" placeholder="Übung">
        <ion-select-option
          v-for="exercise in exercises"
          :key="exercise.id"
          :value="exercise.id"
          >{{ exercise.name }}</ion-select-option
        >
      </ion-select>
    </ion-item>
    <ion-item v-if="doneExercise.exercise">
      <ion-label
        >{{
          exercises.find((el) => el.id === doneExercise.exercise).type ===
          "krafttraining"
            ? "Sets"
            : "Level"
        }}:</ion-label
      >
      <ion-input v-model="doneExercise.sets" type="number" />
    </ion-item>
    <div v-if="doneExercise.exercise && doneExercise.sets">
      <ion-item v-for="set in parseInt(doneExercise.sets)" :key="set">
        <div class="input-row">
          <div class="input-width">
            <ion-input
              v-model="kgData[set]"
              type="number"
              :class="`${
                exercises.find((el) => el.id === doneExercise.exercise).type
              }-input`"
            />
          </div>

          X
          <div class="input-width">
            <ion-input v-model="repsData[set]" type="number" />
          </div>
        </div>
      </ion-item>
    </div>
    <ion-item v-if="doneExercise.exercise">
      <ion-label>Lief gut</ion-label>
      <ion-toggle v-model="doneExercise.feedback" slot="end"></ion-toggle>
    </ion-item>
  </IonCard>
  <IonButton class="mt-10 mx-5" @click="onAdd" expand="block"
    >Hinzufügen</IonButton
  >
</template>

<script setup>
import { ref } from "vue";
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonInput,
  IonButton,
  IonToggle,
} from "@ionic/vue";

import { storeToRefs } from "pinia";
import { useExercisesStore } from "../store/exercises";
import { useTrainingStore } from "../store/training";
const trainingStore = useTrainingStore();
const { addDoneExerciseToCurrentTraining } = trainingStore;
const exercisesStore = useExercisesStore();
const { exercises } = storeToRefs(exercisesStore);

const doneExercise = ref({});
const repsData = ref({});
const kgData = ref({});

const onAdd = async () => {
  const setsData = [];
  for (let i = 1; i <= parseInt(doneExercise.value.sets); i++) {
    setsData.push({
      kg: kgData.value[i],
      reps: repsData.value[i],
    });
  }
  doneExercise.value.setsData = setsData;
  await addDoneExerciseToCurrentTraining(doneExercise.value);
  doneExercise.value = {};
  repsData.value = {};
  kgData.value = {};
};
</script>

<style>
.krafttraining-input::after {
  content: "KG";
}
.cardio-input::after {
  content: "min";
}

.input-width {
  width: 5rem;
}
.input-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
