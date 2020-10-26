import React from 'react'
import Modal from '@material-ui/core/Modal'

const MaterialModal = ({ isOpen, handleClose, children }) => {
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={handleClose}
      >
        {children}
      </Modal>
    </div>
  )
}

export default MaterialModal
