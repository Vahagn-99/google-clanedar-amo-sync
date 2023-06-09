import { createStore } from "vuex";
import subdomain from "./subdomain";
import account from "./account";
import settings from "./settings";
import selectable from "./selectable";

const store = createStore({
    modules: {
        subdomain,
        account,
        settings,
        selectable,
    }
});

export default store;