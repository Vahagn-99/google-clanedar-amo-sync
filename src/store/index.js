import { createStore } from "vuex";
import subdomain from "./subdomain";
import account from "./account";
import settings from "./settings";
import selectable from "./selectable";
import widget from "./widget";

const store = createStore({
    modules: {
        subdomain,
        account,
        settings,
        selectable,
        widget
    }
});

export default store;