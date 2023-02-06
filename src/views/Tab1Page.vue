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
        v-if="trainings.length"
        :training="trainings[trainings.length - 1]"
        class="mb-10"
        :view-all="true"
        @view-all="viewAll"
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
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import TrainingComponent from "../components/TrainingComponent";
import ShowAllTrainingsModal from "../components/ShowAllTrainingsModal";
import { useTrainingStore } from "../store/training";
const trainingStore = useTrainingStore();
const { trainings } = storeToRefs(trainingStore);

const viewAll = async () => {
  const modal = await modalController.create({
    component: ShowAllTrainingsModal,
  });
  modal.present();
};
</script>
