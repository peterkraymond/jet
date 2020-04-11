import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

export default function RecentTurnSnack(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        message={props.message}
      />
    </div>
  )
}
