<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Overview</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Overview</ion-title>
        </ion-toolbar>
      </ion-header>
      <TrainingComponent
        v-for="training in trainings"
        :key="training.id"
        :training="training"
        class="mb-10"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import TrainingComponent from "../components/TrainingComponent";
import { useTrainingStore } from "../store/training";
const trainingStore = useTrainingStore();
const { trainings } = storeToRefs(trainingStore);
</script>
