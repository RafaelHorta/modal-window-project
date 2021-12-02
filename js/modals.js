export default function() {

    const $body = document.querySelector('body');

    let handler = {
        ok: null,
        cancel: null,
        status: false
    };

    // - - - Close Modal Window - - -

    function closingModal($modal) {
        $modal.querySelector('.modal').style.transform = "scale(0,0)";

        setTimeout(() => {
            $modal.style.visibility = "hidden";
        }, 500);
    }

    // - - - Create Modal Window - - -

    function createModal(modalName, title, dark, content, ok, cancel) {
        title = (title != null) ? title : "";
        dark = (dark == true) ? "modal-dark" : "";

        let $templateModal = `
            <div class="modal-container" id="modal-${modalName}">
                <div class="modal ${dark}">
                    <div class="modal-header">
                        <span>${title}</span>
                        <span class="modal-close">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        $body.insertAdjacentHTML('beforeend', $templateModal);

        let $getModal = document.getElementById('modal-' + modalName);

        if (typeof ok !== "undefined" || typeof cancel !== "undefined") {

            const $containerButtons = document.createElement('div');
            $containerButtons.style.paddingTop = "20px";

            if (typeof ok !== "undefined") {
                const $btnOk = document.createElement('button');

                $btnOk.setAttribute('type', 'button');
                $btnOk.innerText = (ok.text != null && ok.text != "") ? ok.text : "OK";
                $btnOk.classList.add('modal-button-ok');

                $btnOk.addEventListener('click', () => {
                    if (ok.callback != null && handler.status) { handler.ok(); }
                    else if (ok.callback != null && handler.status == false) { ok.callback(); }
                });

                $containerButtons.appendChild($btnOk);
            }
            if (typeof cancel !== "undefined") {
                const $btnCancel = document.createElement('button');

                $btnCancel.setAttribute('type', 'button');
                $btnCancel.innerText = (cancel.text != null && cancel.text != "") ? cancel.text : "Cancel";
                $btnCancel.classList.add('modal-button-cancel');

                $btnCancel.addEventListener('click', () => {
                    if (cancel.callback != null && handler.status) { handler.cancel(); }
                    else if (cancel.callback != null && handler.status == false) { cancel.callback(); }

                    closingModal($getModal);
                });

                $containerButtons.appendChild($btnCancel);
            }

            $getModal.querySelector('.modal-body').appendChild($containerButtons);
        }

        $getModal.querySelector('.modal-close').addEventListener('click', () => {
            closingModal($getModal);
        });
    }

    return {

        // - - - Open Modal - - -

        openModal(modalName, {title, dark, content, ok, cancel, callback}) {
            if (document.getElementById("modal-" + modalName) == null) {
                createModal(modalName, title, dark, content, ok, cancel);
            }

            const $idModal = document.getElementById("modal-" + modalName);

            handler.status = true;
            if (ok != null && ok.callback != null) { handler.ok = ok.callback; }
            if (cancel != null && cancel.callback != null) { handler.cancel = cancel.callback; }
            if (callback != null) { callback(); }

            $idModal.style.visibility = "visible";

            setTimeout(() => {
                $idModal.querySelector('.modal').style.transform = "scale(1,1)";
            }, 50);
        },

        // - - - Set Modal - - -

        setModal(btnElement, modalName, {title, dark, content, ok, cancel, callback}) {
            if (document.getElementById("modal-" + modalName) == null) {
                createModal(modalName, title, dark, content, ok, cancel);
            }

            const $idModal = document.getElementById("modal-" + modalName);

            document.querySelector('[modal="' + btnElement + '"]').addEventListener('click', event => {
                event.preventDefault();

                if (callback != null) { callback(); }

                $idModal.style.visibility = "visible";
                handler.status = false;

                setTimeout(() => {
                    $idModal.querySelector('.modal').style.transform = "scale(1,1)";
                }, 50);
            });
        },

        // - - - Close Modal

        closeModal(idModal) {
            closingModal(document.getElementById('modal-' + idModal));
        }
    }
}
