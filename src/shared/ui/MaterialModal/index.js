import React from 'react'
import Modal from '@material-ui/core/Modal'

class MaterialModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          {this.props.children}
        </Modal>
      </div>
    )
  }
}

export default MaterialModal