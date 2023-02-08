<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="cancel">Schließen</ion-button>
      </ion-buttons>
      <ion-title>Verlauf</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <IonCard>
      <ion-item>
        <ion-label position="stacked">Übung</ion-label>
        <ion-select
          @ionChange="onChange"
          v-model="selectedExercise"
          placeholder="Übung"
        >
          <ion-select-option
            v-for="exercise in exercises.filter(
              (el) => el.type === 'krafttraining'
            )"
            :key="exercise.id"
            :value="exercise.id"
            >{{ exercise.name }}</ion-select-option
          >
        </ion-select>
      </ion-item>
    </IonCard>
    <div class="border-b my-5"></div>
    <div class="w-full h-full">
      <canvas id="chart" />
    </div>
  </ion-content>
</template>

<script setup>
import Chart from "chart.js/auto";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCard,
} from "@ionic/vue";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTrainingStore } from "../store/training";
import { useExercisesStore } from "../store/exercises";
const exercisesStore = useExercisesStore();
const { exercises } = storeToRefs(exercisesStore);
const trainingStore = useTrainingStore();
const { trainings } = storeToRefs(trainingStore);
const cancel = async () => {
  await modalController.dismiss();
};

const selectedExercise = ref("");
const chart = ref({});

// eslint-disable-next-line no-unused-vars
const exerciseData = computed(() => {
  const result = [];
  if (!selectedExercise.value) {
    return [];
  }
  for (let i = 0; i < trainings.value.length; i++) {
    const training = trainings.value[i];
    for (let j = 0; j < training.exercises.length; j++) {
      const exercise = training.exercises[j];
      if (exercise.exercise === selectedExercise.value) {
        const value = Math.max(...exercise.setsData.map((el) => el.kg));
        result.push({
          date: training.date,
          value,
        });
      }
    }
  }
  return result;
});

const onChange = () => {
  createChart();
};

const createChart = () => {
  if (chart.value.height) {
    chart.value.destroy();
  }
  chart.value = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: exerciseData.value.map((row) => row.date),
      datasets: [
        {
          label: "KG nach Datum",
          data: exerciseData.value.map((row) => row.value),
        },
      ],
    },
  });
};
</script>
