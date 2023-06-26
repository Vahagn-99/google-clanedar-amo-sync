<template>
  <div class="dtc-activate__wrapper h-full rounded-lg box-border" :class="classObj">
  <div class="dtc-activate__body" >
    <div class="dtc-activate__info-wrapper">
      <div class="dtc-activate__info-body flex start">
        <div class="dtc-activate__icon">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="32px" height="32px">
            <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z"/>
          </svg>
        </div>
        <div>
          <div class="dtc-activate__title">Активация виджета</div>
          <div class="dtc-activate__description">Подтвердите телефон и получите виджет в подарок</div>
        </div>
      </div>
    </div>
    <div class="dtc-activate__controls-wrapper" style="pointer-events: all; opacity: 1;">
      <div class="dtc-activate__controls dtc-activate__controls-dtc">
        <div class="dtc-activate__controls">
          <div class="dtc-activate__phone w-full">
            <label>
              <div class="intl-tel-input">
                <Input id="dtc-activation-phone" v-maska data-mask="(###)###-##-##" v-model="currentCountryCode" type="tel" name="dtc-phone__activation" required="" placeholder="Номер телефона" />
                <div class="flag-dropdown">
                  <div class="selected-flag" title="Russia (Россия): +7" @click="toggleCountryList">
                    <div class="flag" :class="currentCountryFlag"><div class="arrow"></div></div>
                  </div>
                  <ul class="country-list" v-if="openCountryList">
                    <li @click="handleCountryCode(country.code, country.iso.toLowerCase())" v-for="country in countries" :key="country.code" class="country" :data-dial-code="country.iso" :data-country-code="country.code.toLowerCase()">
                      <div :class="'flag '+ country.iso.toLowerCase()"></div>
                      <span class="country-name">{{ country.name }}</span><span class="dial-code">{{country.code}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </label>
          </div>
          <div class="dtc-activate__button">
            <button type="button" class="button-input button-input-disabled" tabindex="" id="dtc-activation-button">
              <span class="button-input-inner"><span class="button-input-inner__text">Подтвердить</span></span>
            </button>
          </div>
        </div>
        <div class="dtc-activate__politics">
          <label class="control-checkbox control-checkbox_small">
            <div class="control-checkbox__body"><input type="checkbox" class="" name="dtc-politics" value="" data-value="" /> <span class="control-checkbox__helper"></span></div>
          </label>
          <span class="dtc-activate__policits-text">
              Я ознакомлен с
              <a href="https://dtc.ru/confidence" target="_blank" class="dtc-tab__activation_user_agreement_link">пользовательским соглашением</a>
              и
              <a href="https://dtc.ru/terms" target="_blank" class="dtc-tab__activation_politics_link">политикой конфиденциальности</a>
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useSelect} from "../compostions/useSelect";
import Input from "./Input.vue";

const props = defineProps({
  isMain:Boolean,
});
const classObj = computed(() => ({
  "bg-[#e3edf6]":props.isMain,
  "bg-[#f8f8f8]":!props.isMain
}));

const {getCountries,countries} = useSelect();
let openCountryList = ref(false);
const currentCountryCode = ref('+7');
const currentCountryFlag = ref('ru');
const currentCountryMask=ref(['(###)###-##-##']);

function handleCountryCode(code,flag,mask){
  currentCountryCode.value = code;
  currentCountryFlag.value = flag;
  currentCountryMask.value=mask;
  openCountryList.value= false;
}

function toggleCountryList(){
  openCountryList.value= !openCountryList.value;
}

onMounted(async ()=>{
  await getCountries();
});
</script>