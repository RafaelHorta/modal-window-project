export default function() {

    const $body = document.querySelector('body');

    // - - - Open Modal Window - - -

    function openingModal(modal) {
        modal.style.visibility = "visible";

        setTimeout(() => {
            modal.querySelector('.modal').style.transform = "scale(1,1)";
        }, 100);
    }

    // - - - Close Modal Window - - -

    function closingModal(modal) {
        modal.querySelector('.modal').style.transform = "scale(0,0)";

        setTimeout(() => {
            modal.style.visibility = "hidden";
            modal.remove();
        }, 500);
    }

    // - - - Create Modal Window - - -

    function createModal(modalName, title, dark, content, ok, cancel) {
        title = (title != null) ? title : "";
        dark = (dark == true) ? "modal-dark" : "";

        let $tmpBtnOk = "", $tmpBtnCancel = "";

        if (typeof ok !== "undefined") {
            $tmpBtnOk = `
                <button type="button" class="modal-button-ok" id="ok-${modalName}">
                    ${(ok.text) ? ok.text : "Acept"}
                </button>`
            ;
        }
        if (typeof cancel !== "undefined") {
            $tmpBtnCancel = `
                <button type="button" class="modal-button-cancel" id="cancel-${modalName}">
                    ${(cancel.text) ? cancel.text : "Cancel"}
                </button>`
            ;
        }
        if (content[0] === "#") {
            content = document.querySelector(content).innerHTML;
        }

        const $templateModal = `
            <div class="modal-container" id="modal-${modalName}">
                <div class="modal ${dark}">
                    <div class="modal-header">
                        ${title}
                    </div>
                    <form class="modal-body" id="frm-${modalName}" autocomplete="off">
                        ${content}
                        <div class="modal-btn-container">
                            ${$tmpBtnOk}
                            ${$tmpBtnCancel}
                        </div>
                    </form>
                </div>
            </div>
        `;

        $body.insertAdjacentHTML('beforeend', $templateModal);
    }

    // - - - Action to Cancel Button

    function onBtnCancel(modal, modalName, btnCancel) {
        const $btnCancelModal = document.getElementById("cancel-" + modalName);

        if (btnCancel.text != null) $btnCancelModal.innerText = btnCancel.text;

        $btnCancelModal.onclick = function(event) {
            if (btnCancel.do != null) btnCancel.do(event);

            closingModal(modal);
        }
    }

    // - - - Action to OK Button

    function onBtnOk(modalName, btnOk, frm) {
        const $btnOkModal = document.getElementById("ok-" + modalName);

        if (btnOk.text != null) $btnOkModal.innerText = btnOk.text;

        if (frm != '') {
            $btnOkModal.type = 'submit';
            frm.onsubmit = function(event) {
                event.preventDefault();

                if (btnOk.do != null) btnOk.do(event);
            }
        } else {
            $btnOkModal.type = 'button';
            $btnOkModal.onclick = function(event) {
                if (btnOk.do != null) btnOk.do(event);
            }
        }

    }

    return {

        // - - - Open Modal - - -

        openModal(modal, {title, dark, form, content, onOk, onCancel}, preOpen = null) {
            if (document.getElementById("modal-" + modal) == null) {
                createModal(modal, title, dark, content, onOk, onCancel);
            }
            if (preOpen != null) preOpen();

            const $modalWindow = document.getElementById("modal-" + modal);
            const $frm = (form != null && form) ? document.getElementById('frm-' + modal) : "";

            if (onOk != null) onBtnOk(modal, onOk, $frm);
            if (onCancel != null) onBtnCancel($modalWindow, modal, onCancel);

            openingModal($modalWindow);
        },

        // - - - Click Modal - - -

        clickModal(btn, modal, {title, dark, form, content, onOk, onCancel}, preOpen = null) {
            document.querySelector('[modal="' + btn + '"]').addEventListener('click', e => {
                e.preventDefault();

                this.openModal(modal, {title, dark, content, form, onOk, onCancel}, preOpen);
            });
        },

        // - - - Close Modal

        closeModal(modal, preClose = null) {
            if (preClose != null) preClose();

            closingModal(document.getElementById('modal-' + modal));
        }
    }
}
