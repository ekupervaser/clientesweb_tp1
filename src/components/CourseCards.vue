<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../composition/useAuth';
import { importCursos, purchaseCourseFirestore } from '../services/shine-services';
import { getUserProfileById, loadUserData } from '../services/user';
import Loader from './Loader.vue';

const { user } = useAuth();

const isLoading = ref(true);
const courses = ref([]);

onMounted(async () => {
  isLoading.value = true;

  await loadUserData(user);

  importCursos(async (data) => {
    const userCourses = user.value?.courses || [];
    const userProfile = await getUserProfileById(user.value.id);
    const userPurchasedCourses = userProfile.coursesPurchased || [];

    courses.value = data.map(course => {
      const isPurchased = userCourses.some(userCourseId => userCourseId === course.id) ||
        userPurchasedCourses.some(purchasedCourse => purchasedCourse.courseId === course.id);

      return {
        ...course,
        isPurchased,
        isPurchasing: false,
      };
    });
    isLoading.value = false;
  });
});


async function purchaseCourse(userId, courseId) {

  const userProfile = await getUserProfileById(userId);

  if (!userProfile.coursesPurchased || !userProfile.coursesPurchased.includes(courseId)) {

    courses.value = courses.value.map(c => ({
      ...c,
      isPurchasing: c.id === courseId,
    }));

    // Obtener la fecha y hora actuales
    const fechaActual = new Date();

    // Actualizar el perfil del usuario con el curso comprado y la fecha de compra
    await purchaseCourseFirestore(userId, courseId);

    courses.value = courses.value.map(course => {
      if (course.id === courseId) {
        return { ...course, isPurchased: true, isPurchasing: false, };
      }
      return course;
    });

    courses.value = courses.value.map(c => ({
      ...c,
      isPurchasing: false,
    }));
  }
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-if="!isLoading" v-for="course in courses" :key="course.id">
      <div class="bg-white p-6 rounded-md shadow-md mb-4 flex flex-col justify-between h-full bg-[#ebc5eb86]">
        <div>
          <h2 class="text-xl font-bold mb-2">{{ course.name }}</h2>
          <p class="text-gray-600">{{ course.description }}</p>
        </div>
        <div class="mt-4">
          <p v-if="!course.isPurchased" class="bg-slate-200 px-2 rounded font-bold w-fit">${{ course.price }}</p>
          <button v-if="!course.isPurchased" @click="purchaseCourse(user.id, course.id)"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            <span v-if="course.isPurchasing">
              <Loader></Loader>
            </span>
            <span v-else>Comprar</span>
          </button>
          <button v-else :disabled="course.isPurchased"
            :class="{ 'bg-gray-300': course.isPurchased, 'cursor-de fault': course.isPurchased }"
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
</template>../services/shine-services