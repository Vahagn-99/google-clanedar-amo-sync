define(['./app.js?cache=' + Date.now()], function (App) {

    const Widget = function () {
        const self = this;
        const _amocrm = window.AMOCRM;
        self.system = this.system();
        self.langs = this.langs;

        /** @private */
        this.callbacks = {
            render() {
                App.default.render(_amocrm);
                return true;
            },
            init() {
                App.default.init(_amocrm);
                return true;
            },
            bind_actions() {
                App.default.bind_actions(_amocrm);
                return true;
            },
            async settings($settings_body) {
                try {
                    await App.default.settings(_amocrm, $settings_body);
                    return true;
                } catch (error) {
                    return true;
                }
            },
            async advancedSettings() {
                $settings_body = document.getElementById('list_page_holder');
                try {
                    await App.default.advancedSettings(_amocrm, $settings_body);
                    return true;
                } catch (error) {
                    return true;
                }
            },
            async onSave() {
                try {
                    await App.default.onSave(_amocrm);
                    return true;
                } catch (error) {
                    return true;
                }
            },
            destroy() {
                App.default.destroy(_amocrm);
                return true;
            },
        };

        return this;
    };

    return Widget;
});