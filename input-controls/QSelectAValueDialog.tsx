import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { QButton } from './QButton';
import { createNumberRange } from '../../app/app_utils';


type QSelectAValueDialogProps = {
  isOpen: boolean
  title: string
  description?: string

  values: string[]
  valueLabels: string[]

  cancelButtonLabel?: string
  commitButtonLabel: string

  onHandleCommit: (valueIndex: number) => void
  onHandleClose: ()=> void
}

export const QSelectAValueDialog = (props: QSelectAValueDialogProps) => {

  return <div>
    <Dialog
      open={props.isOpen}
      onClose={props.onHandleClose}
      >
      <DialogTitle id="set-value-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <Stack>
          {createNumberRange(0, props.values.length).map(i =>
            <QButton 
              onClick={() => props.onHandleCommit(i)}
              sx={{marginTop: "10px"}}
              >
              {props.valueLabels[i]}
            </QButton>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <QButton 
          onClick={props.onHandleClose} 
          sx={{width: "100px"}}
          >
          {props?.cancelButtonLabel ? props?.cancelButtonLabel : 'Cancel'}
        </QButton>
      </DialogActions>
    </Dialog>
  </div>
}
