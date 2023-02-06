<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Übungen</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="onNew">Neue Übung</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Übungen</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExerciseComponent
        v-for="exercise in exercises"
        :key="exercise.id"
        :exercise="exercise"
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
  modalController,
  IonButtons,
  IonButton,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import ExerciseCreateModal from "../components/ExerciseCreateModal";
import ExerciseComponent from "../components/ExerciseComponent";
import { useExercisesStore } from "../store/exercises";
const exercisesStore = useExercisesStore();
const { exercises } = storeToRefs(exercisesStore);
const onNew = async () => {
  const modal = await modalController.create({
    component: ExerciseCreateModal,
  });
  modal.present();
};
</script>
