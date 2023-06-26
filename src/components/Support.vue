<template>
  <div class="feedback-block dtc-feedback-modal-dtc mt-4 rounded-lg" :class="classObj">
    <slot name="text"></slot>
    <div class="dtc-feedback__buttons" data-btns="dtc">
      <button class="dtc-feedback__button" data-feedback="whatsapp">
        <a href="https://web.whatsapp.com/send/?phone=74992132608">
          <span>Напишите в WhatsApp </span>
        </a>
      </button>
      <button class="dtc-feedback__button" data-feedback="telegram">
        <a href="https://t.me/+74992132608">
          <span>Напишите в Telegram</span>
        </a>
      </button>
      <button class="dtc-feedback__button" data-feedback="email">
        <a href="mailto:help@dicitech.com">
          <span>help@dicitech.com</span>
        </a>
      </button>
      <button class="dtc-feedback__button" data-feedback="call">
        <span>+7 499 213 26 08</span>
      </button>
      <button class="dtc-feedback__button" data-feedback="bug">
        <span>Сообщить о ошибке</span>
      </button>
      <button class="dtc-feedback__button" data-feedback="wishes" @click="showModal">
        <span>Предложить идею</span>
      </button>
    </div>
  </div>

    <Modal :size="sm" v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">
          Предложить идею
        </div>
      </template>
      <template #body>
       <div class="px-4">
         <p>
           Вам бы хотелось чтобы виджет умел делать то, что не умеет
           сейчас? Опишите Вашу идею, мы обязательно рассмотрим
           её и возможно реализуем в следующей версии виджета.

         </p>
         <form class="space-y-6 mt-4" action="#">
           <div>
             <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><b>Имя</b></label>
             <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Имя" required>
           </div>
           <div>
             <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><b>Эл. адрес</b></label>
             <input type="email" name="email" id="email" placeholder="Эл. адрес" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
           </div>
           <div class="py-2 bg-white rounded-t-lg dark:bg-gray-800">
             <textarea rows="4" class="p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
           </div>
         </form>
       </div>
      </template>
      <template #footer>
        <div class="w-full p-4">
          <button @click="closeModal" type="button" class=" w-full text-white bg-[#4285F4] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Отправить
          </button>
        </div>
      </template>
    </Modal>
</template>


<script setup>
import { computed } from "vue";
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'

const props = defineProps({
  isMain:Boolean,
});
console.log(props)
const classObj = computed(() => ({
  "dtc-feedback-modal-dtc-settings":!props.isMain,
  "dtc-feedback-modal-dtc-main":props.isMain
}));

const isShowModal = ref(false)
function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}
</script>