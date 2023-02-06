<template>
  <div class="flex flex-col">
    <div class="flex justify-between w-full px-3">
      <p class="font-bold text-xl">Training vom {{ training.date }}</p>
      <IonButtons v-if="viewAll">
        <IonButton @click="$emit('viewAll')">Alle anzeigen</IonButton>
      </IonButtons>
    </div>
    <IonList>
      <IonItemSliding
        v-for="(doneExercise, index) in training.exercises"
        :key="JSON.stringify(doneExercise)"
      >
        <IonItemOptions side="start">
          <IonItemOption @click="onEdit(index)">Bearbeiten</IonItemOption>
        </IonItemOptions>
        <IonItem>
          <DoneExercise class="w-full" :doneExercise="doneExercise" />
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption color="danger" @click="onDelete(index)"
            >Löschen</IonItemOption
          >
        </IonItemOptions>
      </IonItemSliding>
    </IonList>
  </div>
</template>

<script setup>
import {
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/vue";
import DoneExercise from "./DoneExercise";

import { useTrainingStore } from "../store/training";
const trainingStore = useTrainingStore();
const { deleteDoneExerciseFromTraining } = trainingStore;

const props = defineProps({
  training: Object,
  viewAll: Boolean,
});

const onDelete = async (index) => {
  await deleteDoneExerciseFromTraining({
    trainingId: props.training.id,
    index,
  });
};
const onEdit = async (index) => {
  await deleteDoneExerciseFromTraining(props.training.id, index);
};
</script>
