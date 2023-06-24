<template>
   <h2 class="text-slate-900 text-2xl mb-8">Сервиси Google Календаря под ваших нужд!</h2>
    <div class="view-integration-modal__activation">
      <div class="activation-main-wrapper">
        <div class="dtc-activation-page">
          <div class="dtc-send-phone-block">
            <div class="dtc-activate__wrapper">
              <div>
                <div class="dtc-activate__body">
                  <div class="dtc-activate__info-wrapper">
                    <div class="dtc-activate__info-body flex start">
                      <div class="dtc-activate__icon">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="32px" height="32px">
                          <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="dtc-activate__title">Активация виджета</div>
                        <div class="dtc-activate__description">Введите номер телефона.</div>
                      </div>
                    </div>
                  </div>
                  <div class="dtc-activate__controls-wrapper" style="pointer-events: all; opacity: 1;">
                    <div class="dtc-activate__controls dtc-activate__controls-dtc">
                      <div class="dtc-activate__controls">
                        <div class="dtc-activate__phone">
                          <label>
                            <div class="intl-tel-input">
                              <input id="dtc-activation-phone" type="tel" name="dtc-phone__activation" required="" placeholder="Номер телефона" />
                              <div class="flag-dropdown">
                                <div class="selected-flag" title="Russia (Россия): +7" @click="toggleCountryList">
                                  <div class="flag ru"><div class="arrow"></div></div>
                                </div>
                                <ul class="country-list" v-if="openCountryList">
                                  <li class="country" data-dial-code="374" data-country-code="am">
                                    <div class="flag am"></div>
                                    <span class="country-name">Armenia (Հայաստան)</span><span class="dial-code">+374</span>
                                  </li>
                                  <li class="country" data-dial-code="994" data-country-code="az">
                                    <div class="flag az"></div>
                                    <span class="country-name">Azerbaijan (Azərbaycan)</span><span class="dial-code">+994</span>
                                  </li>
                                  <li class="country" data-dial-code="375" data-country-code="by">
                                    <div class="flag by"></div>
                                    <span class="country-name">Belarus (Беларусь)</span><span class="dial-code">+375</span>
                                  </li>
                                  <li class="country highlight" data-dial-code="372" data-country-code="ee">
                                    <div class="flag ee"></div>
                                    <span class="country-name">Estonia (Eesti)</span><span class="dial-code">+372</span>
                                  </li>
                                  <li class="country" data-dial-code="7" data-country-code="kz">
                                    <div class="flag kz"></div>
                                    <span class="country-name">Kazakhstan (Казахстан)</span><span class="dial-code">+7</span>
                                  </li>
                                  <li class="country" data-dial-code="996" data-country-code="kg">
                                    <div class="flag kg"></div>
                                    <span class="country-name">Kyrgyzstan (Кыргызстан)</span><span class="dial-code">+996</span>
                                  </li>
                                  <li class="country" data-dial-code="371" data-country-code="lv">
                                    <div class="flag lv"></div>
                                    <span class="country-name">Latvia (Latvija)</span><span class="dial-code">+371</span>
                                  </li>
                                  <li class="country" data-dial-code="370" data-country-code="lt">
                                    <div class="flag lt"></div>
                                    <span class="country-name">Lithuania (Lietuva)</span><span class="dial-code">+370</span>
                                  </li>
                                  <li class="country" data-dial-code="373" data-country-code="md">
                                    <div class="flag md"></div>
                                    <span class="country-name">Moldova (Republica Moldova)</span><span class="dial-code">+373</span>
                                  </li>
                                  <li class="country active" data-dial-code="7" data-country-code="ru">
                                    <div class="flag ru"></div>
                                    <span class="country-name">Russia (Россия)</span><span class="dial-code">+7</span>
                                  </li>
                                  <li class="country" data-dial-code="992" data-country-code="tj">
                                    <div class="flag tj"></div>
                                    <span class="country-name">Tajikistan</span><span class="dial-code">+992</span>
                                  </li>
                                  <li class="country" data-dial-code="993" data-country-code="tm">
                                    <div class="flag tm"></div>
                                    <span class="country-name">Turkmenistan</span><span class="dial-code">+993</span>
                                  </li>
                                  <li class="country" data-dial-code="380" data-country-code="ua">
                                    <div class="flag ua"></div>
                                    <span class="country-name">Ukraine (Україна)</span><span class="dial-code">+380</span>
                                  </li>
                                  <li class="country" data-dial-code="998" data-country-code="uz">
                                    <div class="flag uz"></div>
                                    <span class="country-name">Uzbekistan (Oʻzbekiston)</span><span class="dial-code">+998</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </label>
                        </div>
                        <div class="dtc-activate__button">
                          <button type="button" class="button-input button-input-disabled" tabindex="" id="dtc-activation-button">
                            <span class="button-input-inner"><span class="button-input-inner__text">Активировать</span></span>
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
              <div class="feedback-block dtc-feedback-modal-dtc">
                <div class="dtc-feedback__text">
                  <strong>Остались вопросы?</strong><br />
                </div>
                <div class="dtc-feedback__buttons" data-btns="dtc">
                  <button class="dtc-feedback__button" data-feedback="call">
<!--                    <span>Обратный связь</span>-->
                    <div class="dtc-feedback__button-img">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.30374 1.13532C3.60772 1.225 2.96809 1.56494 2.50432 2.09172C2.03989 2.61924 1.78368 3.29797 1.78364 4.0008C1.78364 6.43703 2.75143 8.77346 4.47411 10.4961C6.19678 12.2188 8.53322 13.1866 10.9694 13.1866M4.30374 1.13532C4.30879 1.13485 4.31386 1.13596 4.31825 1.1385C4.32284 1.14115 4.32645 1.14523 4.32852 1.15011L5.76685 4.50622C5.76856 4.51021 5.76926 4.51457 5.76888 4.51889C5.7685 4.52322 5.76706 4.52739 5.76468 4.53103L4.57489 6.34897C4.46911 6.50924 4.40658 6.69415 4.39337 6.88574C4.38012 7.07789 4.41694 7.27018 4.50023 7.44385L4.99264 7.20768L4.50207 7.44764C5.14961 8.7715 6.22272 9.83973 7.54952 10.4812L7.55338 10.4831C7.7281 10.5659 7.92136 10.6018 8.11416 10.5872C8.30639 10.5726 8.49155 10.5084 8.6515 10.4008C8.65197 10.4005 8.65243 10.4002 8.6529 10.3999L10.4419 9.20694C10.4456 9.20451 10.4498 9.20302 10.4541 9.20262C10.4585 9.20222 10.4629 9.20292 10.4669 9.20464L13.8185 10.641L13.8201 10.6417C13.825 10.6438 13.8291 10.6474 13.8317 10.652C13.8344 10.6566 13.8355 10.6619 13.8348 10.6672L14.377 10.7328L13.8353 10.6635C13.7462 11.3607 13.406 12.0015 12.8785 12.4659C12.351 12.9303 11.6723 13.1866 10.9694 13.1866M5.48476 6.97087C6.02451 8.07256 6.91773 8.96172 8.02187 9.49642C8.02499 9.49775 8.02838 9.4983 8.03176 9.49805C8.03542 9.49777 8.03896 9.49654 8.042 9.49449L8.04446 9.49282L9.83598 8.29821C9.9908 8.19497 10.1689 8.13199 10.3542 8.11497C10.5395 8.09795 10.7262 8.12742 10.8972 8.20072L14.2472 9.63643C14.2475 9.63656 14.2478 9.6367 14.2481 9.63684C14.4705 9.73156 14.6562 9.89589 14.7772 10.1052C14.8984 10.3147 14.9483 10.558 14.9192 10.7984L14.9187 10.802C14.7959 11.7627 14.3272 12.6457 13.6003 13.2857C12.8733 13.9257 11.938 14.2788 10.9695 14.2788C8.24359 14.2788 5.62929 13.196 3.70178 11.2685C1.77427 9.34095 0.691406 6.72668 0.691406 4.00077C0.691457 3.03225 1.04453 2.09692 1.68452 1.36998C2.32451 0.643037 3.20753 0.174294 4.16824 0.0515194L4.17185 0.0510572C4.4122 0.0219715 4.65549 0.0717949 4.86507 0.192999C5.07436 0.314041 5.23871 0.499738 5.33343 0.722171C5.33356 0.722468 5.3333 0.721874 5.33343 0.722171L6.77077 4.07596C6.84343 4.2455 6.87304 4.43038 6.85695 4.61413C6.84087 4.79789 6.77959 4.97481 6.67858 5.12915L5.48811 6.94814L5.4865 6.95059C5.48447 6.95366 5.48327 6.9572 5.48301 6.96086C5.48278 6.9643 5.48338 6.96773 5.48476 6.97087Z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <button class="dtc-feedback__button" data-feedback="bug">
<!--                    <span>Сообщить о ошибке</span>-->
                    <div class="dtc-feedback__button-img">
                      <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.93615 0.616211C2.45317 0.616211 2.8723 1.03534 2.8723 1.55236V8.07688C2.8723 8.5939 2.45317 9.01303 1.93615 9.01303C1.41913 9.01303 1 8.5939 1 8.07688V1.55236C1 1.03534 1.41913 0.616211 1.93615 0.616211Z"
                        ></path>
                        <path
                            d="M1.93717 13.6693C2.70933 13.6693 3.33528 13.0433 3.33528 12.2712C3.33528 11.499 2.70933 10.873 1.93717 10.873C1.16502 10.873 0.539062 11.499 0.539062 12.2712C0.539062 13.0433 1.16502 13.6693 1.93717 13.6693Z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <button class="dtc-feedback__button" data-feedback="wishes">
<!--                    <span>Предложить идею</span>-->
                    <div class="dtc-feedback__button-img">
                      <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.55549 2.05089C8.63715 1.42098 7.5438 1.09619 6.4305 1.12258C3.55686 1.1888 1.2407 3.58214 1.25396 6.45917C1.25658 7.25834 1.44105 8.04709 1.79339 8.76439C2.14573 9.48169 2.6567 10.1094 3.28759 10.6L3.29009 10.6019C3.55767 10.8127 3.77438 11.081 3.92414 11.387C4.0739 11.693 4.15287 12.0287 4.1552 12.3693L4.15522 12.3728L4.15521 12.8079C4.15521 12.8292 4.16367 12.8496 4.17872 12.8647C4.19377 12.8797 4.21418 12.8882 4.23546 12.8882H6.05859V9.53327L3.88479 7.35938C3.68953 7.16412 3.68953 6.84753 3.8848 6.65228C4.08007 6.45702 4.39665 6.45702 4.59191 6.65229L6.55871 8.61917L8.52689 6.65217C8.72221 6.45697 9.03879 6.45707 9.234 6.65239C9.4292 6.84771 9.4291 7.16429 9.23378 7.3595L7.05859 9.53337V12.8882H8.87745C8.89874 12.8882 8.91915 12.8797 8.9342 12.8647C8.94925 12.8496 8.9577 12.8292 8.9577 12.8079V12.3728C8.95837 12.0289 9.03765 11.6888 9.18948 11.3803C9.34099 11.0725 9.56075 10.8032 9.83201 10.5931C10.7072 9.90551 11.3439 8.95989 11.6518 7.89025C11.9598 6.82008 11.9231 5.6801 11.5468 4.63198C11.1705 3.58386 10.4738 2.6808 9.55549 2.05089ZM6.40713 0.122857C7.73028 0.0915605 9.0297 0.477602 10.1211 1.22625C11.2127 1.97495 12.0408 3.04831 12.488 4.2941C12.9352 5.53989 12.9789 6.89486 12.6128 8.16685C12.2466 9.43884 11.4893 10.5633 10.4483 11.3807L10.4453 11.383C10.2939 11.5001 10.1712 11.6502 10.0867 11.8219C10.0023 11.9935 9.95814 12.1821 9.9577 12.3733C9.9577 12.3734 9.9577 12.3731 9.9577 12.3733V12.8079C9.9577 13.0944 9.84389 13.3692 9.64131 13.5718C9.43872 13.7744 9.16395 13.8882 8.87745 13.8882H4.23546C3.94896 13.8882 3.6742 13.7744 3.47161 13.5718C3.26902 13.3692 3.15521 13.0944 3.15521 12.8079V12.3746C3.15368 12.1846 3.10951 11.9973 3.02596 11.8266C2.9424 11.6559 2.82156 11.5061 2.67239 11.3883C1.92233 10.8048 1.31481 10.0583 0.895822 9.20527C0.476577 8.35176 0.257084 7.41403 0.253971 6.46311C0.25397 6.46289 0.253972 6.46334 0.253971 6.46311C0.238577 3.04486 2.98545 0.201877 6.40713 0.122857ZM3.15625 15.709C3.15625 15.4328 3.38011 15.209 3.65625 15.209H9.45874C9.73488 15.209 9.95874 15.4328 9.95874 15.709C9.95874 15.9851 9.73488 16.209 9.45874 16.209H3.65625C3.38011 16.209 3.15625 15.9851 3.15625 15.709Z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" class="float-right">
        <button
            type="button"
            @click="goToAdvancedSettings"
            class="dtc-button my-2 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg class="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M19.23 12.93c.03-.24.07-.48.07-.73s-.04-.49-.07-.73l2.01-1.58c.14-.11.18-.32.1-.49l-2-3.46c-.09-.16-.3-.24-.49-.19l-2.49 1c-.45-.34-.92-.62-1.42-.83l-.38-2.6c-.04-.26-.25-.45-.5-.45h-4c-.26 0-.46.19-.5.45l-.38 2.6c-.5.21-.97.49-1.42.83l-2.49-1c-.19-.08-.4 0-.49.19l-2 3.46c-.08.17-.03.38.1.49l2.01 1.58c-.03.24-.07.48-.07.73s.04.49.07.73l-2.01 1.58c-.14.11-.18.32-.1.49l2 3.46c.09.16.3.24.49.19l2.49-1c.45.34.92.62 1.42.83l.38 2.6c.04.26.25.45.5.45h4c.26 0 .46-.19.5-.45l.38-2.6c.5-.21.97-.49 1.42-.83l2.49 1c.19.08.4 0 .49-.19l2-3.46c.08-.17.03-.38-.1-.49l-2.01-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          Настроить виджет!
        </button>
      </div>
    </div>
</template>

<script setup>
import { inject } from "vue";
import WidgetContainer from "./components/WidgetContainer.vue";
import { goTo } from "./helpers/helpers";
import { useWidget } from "./compostions/useWidget";
const widget = inject("widget");

const { getWidgetCode, widgetCode } = useWidget();
let openCountryList = false;
const goToAdvancedSettings = () => {
  goTo(`https://${widget.system.domain}/settings`);
};

function toggleCountryList(){
  openCountryList= !openCountryList;
}
</script>
