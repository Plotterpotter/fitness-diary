<template>
  <IonCard>
    <IonCardHeader>
      <IonCardSubtitle>
        {{ exercise.type }}
      </IonCardSubtitle>
      <IonCardTitle>
        {{ exercise.name }}
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent v-if="exercise.description">
      {{ exercise.description }}
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
} from "@ionic/vue";
defineProps({
  exercise: Object,
});
</script>
