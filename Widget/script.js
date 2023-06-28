define(['./app.js?cache=' + Date.now()], function (App) {

    const Widget = function () {
        const self = this;
        const _amocrm = window.AMOCRM;
        self.system = this.system();
        self.langs = this.langs;

        /** @private */
        this.callbacks = {
            render() {
                return App.default.render(_amocrm);
            },
            init() {
                return App.default.init(_amocrm);
            },
            bind_actions() {
                return App.default.bind_actions(_amocrm);
            },
            async settings($settings_body) {
                try {
                    await App.default.settings(_amocrm, $settings_body);
                } catch (error) {
                    throw error
                }
            },
            async advancedSettings() {
                $settings_body = document.getElementById('list_page_holder');
                try {
                    await App.default.advancedSettings(_amocrm, $settings_body);
                } catch (error) {
                    throw error
                }
            },
            async onSave() {
                try {
                    return await App.default.onSave(_amocrm);
                } catch (error) {
                    throw error
                }
            },
            destroy() {
                return App.default.destroy(_amocrm);
            },
            contacts: {
                selected() {
                    return App.default.contacts_selected(self);
                }
            },
            leads: {
                selected() {
                    return App.default.leads_selected(self);
                }
            },
            tasks: {
                selected() {
                    return App.default.tasks_selected(self);
                }
            }
        };

        return this;
    };

    return Widget;
});