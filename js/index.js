import Modals from "./modals.min.js";

document.addEventListener('DOMContentLoaded', () => {

    const modal = Modals();
    const $tmpForm = document.getElementById('tmp-form').innerHTML;

    modal.setModal('normal', 'normal', {
        title: 'Name Modal',
        content: 'Normal Text',
        cancel: {}
    });

    modal.setModal('normal-dark', 'normal-dark', {
        title: 'Name Modal',
        content: 'Normal Dark Text',
        dark: true,
        ok: {
            callback() {
                modal.closeModal('normal-dark');
            }
        }
    });

    modal.setModal('html-content', 'html-content', {
        title: 'Name Modal',
        content: $tmpForm
    });

    modal.setModal('html-content-dark', 'html-content-dark', {
        title: 'Name Modal',
        dark: true,
        content: $tmpForm
    });

    modal.setModal('link', 'link', {
        content: "Normal Modal Link",
        ok: {
            text: "Yes",
            callback() {
                modal.closeModal('link');
                modal.openModal('new', {
                    dark: true,
                    content: "I'm new modal",
                    cancel: {}
                });
            }
        },
        cancel: {
            text: "No"
        }
    });

});