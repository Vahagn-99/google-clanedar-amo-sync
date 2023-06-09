import { createStore } from "vuex";
import client from "./client";
import account from "./account";
import settings from "./settings";
import selectable from "./selectable";

const store = createStore({
    modules: {
        client,
        account,
        settings,
        selectable,
    }
});

export default store;