import './Modal.css'

/**
 * Reusable modal wrapper.
 * Props: show, onClose, title, children, actions (ReactNode)
 */
export default function Modal({ show, onClose, title, icon, children, actions }) {
  if (!show) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Icon */}
        {icon && <div className="modal-icon">{icon}</div>}

        {/* Title */}
        {title && <h3 className="modal-title">{title}</h3>}

        {/* Body */}
        <div className="modal-body">{children}</div>

        {/* Actions */}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  )
}

/* ---- Pre-built modal variants ---- */

export function AlertModal({ show, onClose }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      icon="⚠️"
      title="Missing Details"
      actions={
        <button className="btn-phoenix" onClick={onClose}>
          OK, Got It
        </button>
      }
    >
      <p>Please fill in all fields before applying.</p>
    </Modal>
  )
}

export function ConfirmModal({ show, pendingUser, onCancel, onConfirm }) {
  if (!pendingUser) return null

  return (
    <Modal
      show={show}
      onClose={onCancel}
      icon="📝"
      title="Confirm Booking"
      actions={
        <>
          <button className="btn-secondary-phoenix" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-phoenix" onClick={onConfirm}>
            Confirm Booking
          </button>
        </>
      }
    >
      <p>Please verify the following details:</p>
      <ul className="confirm-details">
        <li>
          <span className="detail-label">Name</span>
          <span className="detail-value">{pendingUser.name}</span>
        </li>
        <li>
          <span className="detail-label">Email</span>
          <span className="detail-value">{pendingUser.email}</span>
        </li>
        <li>
          <span className="detail-label">Phone</span>
          <span className="detail-value">{pendingUser.phone}</span>
        </li>
        <li>
          <span className="detail-label">Room Type</span>
          <span className="detail-value">
            <span className={`room-badge ${pendingUser.roomType.toLowerCase()}`}>
              {pendingUser.roomType}
            </span>
          </span>
        </li>
      </ul>
    </Modal>
  )
}

export function SuccessModal({ show, onClose }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      icon="🎉"
      title="Booking Successful!"
      actions={
        <button className="btn-phoenix" onClick={onClose}>
          Wonderful!
        </button>
      }
    >
      <p>
        Your room has been successfully reserved. We look forward to welcoming
        you at Hotel Phoenix!
      </p>
    </Modal>
  )
}
