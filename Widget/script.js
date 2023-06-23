define(['./app.js?cache=' + Date.now()], function (App) {

    const Widget = function () {
        const self = this;
        self.system = this.system();
        self.langs = this.langs;

        /** @private */
        this.callbacks = {
            render() {
                return App.default.render(self);
            },
            init() {
                return App.default.init(self);
            },
            bind_actions() {
                return App.default.bind_actions(self);
            },
            async settings($settings_body, context) {
                return await App.default.settings(self, $settings_body, context);
            },
            async onSave() {
                try {
                    return await App.default.onSave(self);
                } catch (error) {
                    throw error
                }
            },
            destroy() {
                return App.default.destroy(self);
            },
            advancedSettings() {
                return App.default.advanced_settings(self, '#list_page_holder');
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