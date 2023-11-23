<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../composition/useAuth';
import { importCursos } from '../services/courses';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../services/firebase';
import { getUserProfileById } from '../services/user';
import Loader from './Loader.vue';
/* import { purchaseCourse } from '../services/user'; */

const { user } = useAuth();
const isLoading = ref(true);    
const courses = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await loadUserData();

  importCursos(async (data) => {
    const userCourses = user.value?.courses || [];
    const userProfile = await getUserProfileById(user.value.id);
    const userPurchasedCourses = userProfile.coursesPurchased || [];

    courses.value = data.map(course => {
      const isPurchased = userCourses.some(userCourseId => userCourseId === course.id) ||
                          userPurchasedCourses.includes(course.id);

      return {
        ...course,
        isPurchased
      };
    });
    isLoading.value = false;
  });
});

async function loadUserData() {
  if (user.value) {
    const userDocRef = doc(db, `users/${user.value.id}`);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      userCourses.value = userData.courses || [];
    }
  }
}

async function purchaseCourse(userId, courseId) {
    const userProfile = await getUserProfileById(userId);

    // Verifica si el curso ya ha sido comprado
    if (!userProfile.coursesPurchased || !userProfile.coursesPurchased.includes(courseId)) {
      const userRef = doc(db, `users/${userId}`);
      await updateDoc(userRef, {
        coursesPurchased: arrayUnion(courseId),
      });

      courses.value = courses.value.map(course => {
        if (course.id === courseId) {
          return { ...course, isPurchased: true };
        }
        return course;
      });
    }
}
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-if="!isLoading" v-for="course in courses" :key="course.id">
        <div class="bg-white p-6 rounded-md shadow-md mb-4 flex flex-col justify-between h-full bg-[#f1d6f1b7]">
          <div>
            <h2 class="text-xl font-bold mb-2">{{ course.name }}</h2>
            <p class="text-gray-600">{{ course.description }}</p>
          </div>
          <div class="mt-4">
            <p v-if="!course.isPurchased" class="bg-slate-200 px-2 rounded font-bold w-fit">${{ course.price }}</p>
            <button v-if="!course.isPurchased"
              @click="purchaseCourse(user.id, course.id)"
              class="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
                Comprar
            </button>
            <button v-else 
            :disabled="course.isPurchased"
            :class="{ 'bg-gray-300': course.isPurchased, 'cursor-default': course.isPurchased }"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Comprado
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <Loader></Loader>
      </div>
    </div>
  </template>