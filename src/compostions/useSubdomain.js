import { computed, inject } from 'vue';
import { useStore } from 'vuex';

export function useSubdomain() {
    const store = useStore();
    const amocrm = inject('amocrm');
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const subdomain = computed(() => store.getters['subdomain/getSubdomain']);
    const isLicensed = computed(() => store.getters['subdomain/isLicensed']);
    const isRegistred = computed(() => store.getters['subdomain/isRegistred']);
    const hasPhone = computed(() => store.getters['subdomain/hasPhone']);
    const account = computed(() => store.getters['subdomain/getAccount']);

    const checkIsRegistred = async () => await store.dispatch('subdomain/checkIsRegistred', subdomainId.value);
    const checkIsLicensed = async () => await store.dispatch('subdomain/checkIsLicensed', subdomainId.value);
    const getAccount = async () => await store.dispatch('subdomain/getAccount');

    const addPhone = async (phone) => {
        await store.dispatch('subdomain/addPhone', phone);
        await checkHasPhone();
    };

    const checkHasPhone = async () => await store.dispatch('subdomain/checkHasPhone');
    const getSubdomain = async () => await store.dispatch('subdomain/getSubdomain');

    const asyncSubdomain = async () => {
        const Account = amocrm.constant('account')
        const User = amocrm.constant('user')
        await store.dispatch('subdomain/store', {
            name: User.name,
            amocrm_id: Account.id,
            phone: User.personal_mobile,
            subdomain: Account.subdomain,
            country: Account.country,
            currency: Account.currency,
            paid_from: Account.paid_from,
            paid_till: Account.paid_till,
            pay_type: Account.pay_type,
            tariff: Account.tariffName,
        });
    }

    return {
        asyncSubdomain,
        checkIsRegistred,
        checkIsLicensed,
        subdomainId,
        isRegistred,
        isLicensed,
        widget,
        checkHasPhone,
        addPhone,
        subdomain,
        hasPhone,
        getSubdomain,
        getAccount,
        account
    };
}