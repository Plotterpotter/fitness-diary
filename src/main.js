import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import { IonicVue } from "@ionic/vue";

import "./assets/tailwind.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useExercisesStore } from "./store/exercises";
import { useTrainingStore } from "./store/training";
const pinia = createPinia();
const app = createApp(App).use(IonicVue).use(router).use(pinia);

router.isReady().then(async () => {
  const trainingStore = useTrainingStore();
  const { loadCurrentTraining, loadTrainings } = trainingStore;
  const exercisesStore = useExercisesStore();
  const { loadExercises } = exercisesStore;
  await loadExercises();
  await loadCurrentTraining();
  await loadTrainings();
  app.mount("#app");
});
