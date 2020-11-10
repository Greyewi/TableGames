import React from 'react'
import Modal from '@material-ui/core/Modal'

const MaterialModal = ({ open, handleClose, children }) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={open}
    onClose={handleClose}
  >
    {children}
  </Modal>
)

export default MaterialModal
