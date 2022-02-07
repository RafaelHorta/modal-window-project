import Modals from "./modals.js";

document.addEventListener('DOMContentLoaded', () => {

    const modal = Modals();
    const $response = document.getElementById('response');

    modal.clickModal('normal', 'open', {
        title: 'Normal',
        content: 'Normal Modal',
        onOk: {
            do(e) {
                $response.innerText = "Ok Normal";
                modal.closeModal('open');
            }
        },
        onCancel: {
            do(e) {
                $response.innerText = "Cancel Normal";
            }
        }
    }, function() {
        $response.innerText = "Opening Ok Normal";
    });

    modal.clickModal('normal-dark', 'login', {
        title: "Dark Normal",
        dark: true,
        form: true,
        content: '#tmp-form',
        onOk: {
            do(e) {
                modal.closeModal('open');
            }
        },
        onCancel: {
            do(e) {
                $response.innerText = "Cancel Normal Dark";
            }
        }
    }, function() {
        $response.innerText = "Opening Ok Dark Normal";
    });

});