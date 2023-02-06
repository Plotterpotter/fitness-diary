<template>
  <IonCard>
    <IonCardHeader>
      <IonCardSubtitle class="flex flex-row items-center justify-between"
        ><span
          >{{
            exercises.find((el) => el.id === doneExercise.exercise).type ===
            "krafttraining"
              ? "Sets:"
              : "Level:"
          }}
          {{ doneExercise.sets }}</span
        ><IonIcon
          :class="doneExercise.feedback ? 'text-green-400' : 'text-red-400'"
          :icon="doneExercise.feedback ? thumbsUp : thumbsDown"
      /></IonCardSubtitle>
      <IonCardTitle class="text-xl">
        {{
          exercises.find((el) => el.id === doneExercise.exercise).name
        }}</IonCardTitle
      >
    </IonCardHeader>
    <IonCardContent>
      <div
        v-for="(set, index) in doneExercise.setsData"
        :key="JSON.stringify(set) + index"
        class="flex flex-row justify-between w-full"
      >
        <p>
          {{ set.kg }}
          {{
            exercises.find((el) => el.id === doneExercise.exercise).type ===
            "krafttraining"
              ? "KG"
              : "min"
          }}
        </p>
        <p>
          {{
            exercises.find((el) => el.id === doneExercise.exercise).type ===
            "krafttraining"
              ? "X"
              : "auf"
          }}
        </p>
        <p>
          {{ set.reps
          }}{{
            exercises.find((el) => el.id === doneExercise.exercise).type ===
            "krafttraining"
              ? " Wiederholungen"
              : ". Stufe"
          }}
        </p>
      </div>
    </IonCardContent>
  </IonCard>
</template>

<script setup>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
} from "@ionic/vue";
import { thumbsDown, thumbsUp } from "ionicons/icons";
import { useExercisesStore } from "../store/exercises";
import { storeToRefs } from "pinia";
const exercisesStore = useExercisesStore();
const { exercises } = storeToRefs(exercisesStore);
defineProps({
  doneExercise: Object,
});
</script>
