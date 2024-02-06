import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"

type QCheckboxProps = {
  label: string
  checked: boolean
  onChecked: (checkValue: boolean) => void
}


export const QCheckbox = (props: QCheckboxProps) => {
  return <FormGroup>
    <FormControlLabel 
      control={
        <Checkbox
          onChange={(event) => props.onChecked(event.target.checked)} 
          checked={props.checked}
          />
        } 
      label={props.label}
    />
  </FormGroup>
}
