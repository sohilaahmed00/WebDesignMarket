/**
 * Manages UI components like alerts and confirmation modals across the entire site.
 */
class UIManager {
    constructor() {
        this._injectAlertContainer();
        this._injectConfirmModal();
        this.confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    }

    /**
     * Injects the alert container into the body if it doesn't exist.
     * This ensures showAlert() works on any page.
     * @private
     */
    _injectAlertContainer() {
        if (!document.getElementById('alert-container')) {
            const container = document.createElement('div');
            container.id = 'alert-container';
            container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1055; min-width: 300px;';
            document.body.appendChild(container);
        }
    }

    /**
     * Injects the confirmation modal into the body.
     * @private
     */
    _injectConfirmModal() {
        if (!document.getElementById('confirmModal')) {
            const modalHTML = `
                <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="confirmModalLabel">Confirm Action</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="confirmModalBody">
                                Are you sure you want to proceed?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" id="confirmModalButton">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }

    /**
     * Displays a styled alert message.
     * @param {string} message - The message to display.
     * @param {string} type - The type of alert ('success', 'danger', 'warning', 'info').
     */
    showAlert(message, type = 'success') {
        const alertContainer = document.getElementById('alert-container');
        const iconMap = {
            success: 'fa-check-circle',
            danger: 'fa-exclamation-triangle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        const icon = iconMap[type] || 'fa-info-circle';
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} d-flex align-items-center fade show shadow-sm`;
        alert.role = 'alert';
        alert.innerHTML = `
            <i class="fas ${icon} me-3" style="font-size: 1.5rem;"></i>
            <div>${message}</div>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alert);

        setTimeout(() => {
            if (alert) {
                new bootstrap.Alert(alert).close();
            }
        }, 5000);
    }

    /**
     * Shows a confirmation modal and executes a callback on confirmation.
     * @param {string} message - The confirmation message to display in the modal body.
     * @param {function} onConfirm - The function to execute when the user clicks "Confirm".
     */
    showConfirm(message, onConfirm) {
        const modalBody = document.getElementById('confirmModalBody');
        const confirmButton = document.getElementById('confirmModalButton');

        modalBody.textContent = message;

        const newConfirmButton = confirmButton.cloneNode(true);
        confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);

        newConfirmButton.addEventListener('click', () => {
            onConfirm();
            this.confirmModal.hide();
        });

        this.confirmModal.show();
    }
}

const ui = new UIManager();
