<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="cancel">Schließen</ion-button>
      </ion-buttons>
      <ion-title>Alle Trainings</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <TrainingComponent
      v-for="training in trainings"
      :key="training.id"
      :training="training"
      :view-all="false"
      class="mb-10"
    />
  </ion-content>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import TrainingComponent from "../components/TrainingComponent";
import { useTrainingStore } from "../store/training";
const trainingStore = useTrainingStore();
const { trainings } = storeToRefs(trainingStore);
const cancel = async () => {
  await modalController.dismiss();
};
</script>
