import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { QButton } from './QButton';


export type DoValidationResponse = {
  isValidValue: boolean
  validationMessage?: string
}

type QInputAValueDialogProps = {
  isOpen: boolean
  title: string
  description?: string
  inputLabel: string
  initValue: string
  cancelButtonLabel?: string
  commitButtonLabel: string

  doValidation: (latestValue: string) => DoValidationResponse
  onHandleCommit: (value: string) => void
  onHandleClose: ()=> void
}

export const QInputAValueDialog = (props: QInputAValueDialogProps) => {

  const [inputValue, setInputValue] = useState(props.initValue);
  const [commitEnabled, setCommitEnabled] = useState(props.doValidation(props.initValue).isValidValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    const updateResponse = props.doValidation(e.target.value);
    if (!updateResponse.isValidValue) {
      setCommitEnabled(false);
    } else {
      setCommitEnabled(true);
    }
  }

  const onTextFieldKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      onHandleSave();
    }
  }

  const onHandleSave = () => {
    props.onHandleCommit(inputValue);
  }

  useEffect(() => {

  }, []);

  const handleFocus = (event: any) => {
    event.preventDefault();
    const { target } = event;
    target.focus();
    target.setSelectionRange(0, inputValue.length);
  };

  if (!props.isOpen) {
    return null;
  }

  return <div>
    <Dialog
      open={props.isOpen}
      onClose={props.onHandleClose}
      >
      <DialogTitle id="set-value-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <Container
          sx={{
            paddingTop: "10px"
          }}
          >
          <TextField
            autoFocus
            value={inputValue}
            label={props.inputLabel}
            variant="outlined" 
            onChange={(event) => handleChange(event)}
            inputProps={{style:{marginLeft: "16px"}}}
            onFocus={handleFocus}
            onKeyPress={(e) => onTextFieldKeyPress(e)}
            />
        </Container>
      </DialogContent>
      <DialogActions>
        <QButton 
          onClick={props.onHandleClose} 
          sx={{width: "100px"}}
          >
          {props?.cancelButtonLabel ? props?.cancelButtonLabel : 'Cancel'}
        </QButton>
        <QButton
          disabled={!commitEnabled}
          onClick={onHandleSave} 
          sx={{width: "100px"}}
          >
          {props.commitButtonLabel}
        </QButton>
      </DialogActions>
    </Dialog>
  </div>
}
