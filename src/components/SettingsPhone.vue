<template>
  <div class="dtc-activate__wrapper h-full rounded-lg box-border" :class="classObj">
  <div class="dtc-activate__body" >
    <div class="dtc-activate__info-wrapper">
      <div class="dtc-activate__info-body flex start">
        <div class="dtc-activate__icon">
          <slot v-if="value" name="trueValue"></slot>
          <slot v-else name="falseValue"></slot>
        </div>
        <div>
          <div class="dtc-activate__title">Статус клиента </div>
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
                <Input id="dtc-activation-phone"
                       label=""
                       type="tel" name="dtc-phone__activation" :pattern="currentCountryMask" v-model="currentCountryCode" placeholder="Номер телефона" />
                <div class="flag-dropdown"  @click="toggleCountryList">
                 <div class="flex items-center pr-[5px]">
                   <div class="selected-flag" title="Russia (Россия): +7">
                     <div class="flag" :class="currentCountryFlag">
                       <div class="arrow"></div>
                     </div>
                   </div>
                 </div>
                  <ul class="country-list" v-if="openCountryList">
                    <li @click="handleCountryCode(country.code, country.iso.toLowerCase(),country.mask)" v-for="country in countries" :key="country.code" class="country" :data-dial-code="country.iso" :data-country-code="country.code.toLowerCase()">
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
const currentCountryMask=ref([currentCountryCode.value+'(###)###-##-##']);

function handleCountryCode(code,flag,mask){
  currentCountryCode.value = code;
  currentCountryFlag.value = flag;
  currentCountryMask.value=code+mask;
  openCountryList.value= false;
}

function toggleCountryList(){
  openCountryList.value= !openCountryList.value;
}

onMounted(async ()=>{
  await getCountries();
});
</script>