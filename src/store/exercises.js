import { defineStore } from "pinia";
import uniqid from "uniqid";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
export const useExercisesStore = defineStore("exercises", {
  state: () => ({
    exercises: [],
    currentExercise: null,
  }),
  actions: {
    async loadExercises() {
      try {
        const contents = await Filesystem.readFile({
          path: "exercises.txt",
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
        console.log(contents);
        if (contents) {
          this.exercises = JSON.parse(contents.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async saveExercise(exercise) {
      try {
        let exercises;
        try {
          const contents = await Filesystem.readFile({
            path: "exercises.txt",
            directory: Directory.Data,
            encoding: Encoding.UTF8,
          });
          if (contents) {
            exercises = JSON.parse(contents.data);
          }
        } catch (e2) {
          console.log(e2);
          exercises = [];
        }

        exercise.id = uniqid();
        console.log(exercise);
        exercises.push(exercise);

        await Filesystem.writeFile({
          path: "exercises.txt",
          data: JSON.stringify(exercises),
          directory: Directory.Data,
          encoding: Encoding.UTF8,
          recursive: true,
        });
        this.exercises = exercises;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
