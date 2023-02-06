<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Abbrechen</ion-button>
      </ion-buttons>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="save">Speichern</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <IonCard>
      <ion-item>
        <ion-label position="stacked">Übungsname</ion-label>
        <ion-input v-model="exerciseName" placeholder="Übungsname"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Übungstyp</ion-label>
        <ion-select v-model="exerciseType" placeholder="Übungstyp">
          <ion-select-option value="cardio">Cardio</ion-select-option>
          <ion-select-option value="krafttraining"
            >Krafttraining</ion-select-option
          >
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Beschreibung</ion-label>
        <ion-textarea
          v-model="description"
          placeholder="Beschreibung"
        ></ion-textarea>
      </ion-item>
    </IonCard>
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
  IonItem,
  IonLabel,
  IonInput,
  modalController,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonCard,
} from "@ionic/vue";

import { ref } from "vue";
import { useExercisesStore } from "../store/exercises";

const exerciseName = ref("");
const exerciseType = ref("");
const description = ref("");

const save = async () => {
  console.log(exerciseName.value);
  console.log(exerciseType.value);
  const exerciseStore = useExercisesStore();
  const { saveExercise } = exerciseStore;
  await saveExercise({
    name: exerciseName.value,
    type: exerciseType.value,
    description: description.value,
  });
  await modalController.dismiss();
};

const cancel = async () => {
  await modalController.dismiss();
};
</script>
