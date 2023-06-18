define(['./app.js?cache=' + Date.now()], function (App) {

    const Widget = function () {
        const self = this;
        self.system = this.system();
        self.langs = this.langs;

        /** @private */
        this.callbacks = {
            render() {
                App.default.render(self);
                return true;
            },
            init() {
                App.default.init(self);
                return true;
            },
            bind_actions() {
                App.default.bind_actions(self);
                return true;
            },
            settings($settings_body, context) {
                App.default.settings(self, $settings_body, context);
            },
            onSave() {
                return App.default.onSave(self);
            },
            destroy() {
                App.default.destroy(self);
                return true;
            },
            advancedSettings: function () {
                App.default.advanced_settings(self, '#list_page_holder');
            },
            contacts: {
                selected() {
                    App.default.contacts_selected(self);
                }
            },
            leads: {
                selected() {
                    App.default.leads_selected(self);
                }
            },
            tasks: {
                selected() {
                    App.default.tasks_selected(self);
                }
            }
        };

        return this;
    };

    return Widget;
});
