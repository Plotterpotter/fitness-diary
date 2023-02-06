import { defineStore } from "pinia";
import uniqid from "uniqid";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
export const useTrainingStore = defineStore("training", {
  state: () => ({
    currentTraining: {
      exercises: [],
    },
    trainings: [],
  }),
  actions: {
    async loadTrainings() {
      try {
        const contents = await Filesystem.readFile({
          path: "trainings.txt",
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
        console.log(JSON.stringify(contents));
        if (contents) {
          this.trainings = JSON.parse(contents.data);
          console.log(this.trainings);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async loadCurrentTraining() {
      try {
        const contents = await Filesystem.readFile({
          path: "currentTraining.txt",
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
        if (contents) {
          this.currentTraining = JSON.parse(contents.data);
        }
        console.log(this.currentTraining);
      } catch (e) {
        console.log(e);
      }
    },
    async addDoneExerciseToCurrentTraining(doneExercise) {
      try {
        this.currentTraining.exercises.push(doneExercise);
        await Filesystem.writeFile({
          path: "currentTraining.txt",
          data: JSON.stringify(this.currentTraining),
          directory: Directory.Data,
          encoding: Encoding.UTF8,
          recursive: true,
        });
      } catch (e) {
        console.log(e);
      }
    },
    async endTraining() {
      try {
        let trainings;
        try {
          const contents = await Filesystem.readFile({
            path: "trainings.txt",
            directory: Directory.Data,
            encoding: Encoding.UTF8,
          });
          if (contents) {
            trainings = JSON.parse(contents.data);
          }
        } catch (e2) {
          console.log(e2);
          trainings = [];
        }

        this.currentTraining.id = uniqid();
        this.currentTraining.date = `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`;
        trainings.push(this.currentTraining);
        await Filesystem.writeFile({
          path: "trainings.txt",
          data: JSON.stringify(trainings),
          directory: Directory.Data,
          encoding: Encoding.UTF8,
          recursive: true,
        });
        await Filesystem.deleteFile({
          path: "currentTraining.txt",
          directory: Directory.Data,
        });
        this.trainings.push(this.currentTraining);
        this.currentTraining = {
          exercises: [],
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
});
