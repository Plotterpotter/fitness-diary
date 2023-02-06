<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Trainieren</ion-title>
        <ion-buttons slot="end">
          <ion-button v-if="currentTraining.exercises.length" @click="onEnd"
            >Abschließen</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Trainieren</ion-title>
        </ion-toolbar>
      </ion-header>
      <CreateDoneExercise />
      <div class="border-b my-5"></div>
      <IonList>
        <IonItem
          v-for="doneExercise in currentTraining.exercises"
          :key="JSON.stringify(doneExercise)"
        >
          <DoneExercise class="w-full" :doneExercise="doneExercise" />
        </IonItem>
      </IonList>
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
  IonButtons,
  IonButton,
  alertController,
  IonList,
  IonItem,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import CreateDoneExercise from "../components/CreateDoneExercise";
import DoneExercise from "../components/DoneExercise";
import { useTrainingStore } from "../store/training";
const trainingStore = useTrainingStore();
const { currentTraining } = storeToRefs(trainingStore);
const { endTraining } = trainingStore;

const onEnd = async () => {
  const alert = await alertController.create({
    header: "Training beenden?",
    subHeader: "Möchtest du das Training beenden?",
    buttons: [
      {
        text: "Ja, beenden",
        handler: async () => {
          await endTraining();
        },
      },
      {
        text: "Nein, weiter trainieren",
        role: "cancel",
      },
    ],
  });
  await alert.present();
};
</script>
