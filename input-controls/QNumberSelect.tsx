import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Container } from "@mui/material";


const createSelectMenuItems = (values: number[], valueLabelOffset: number) => {

  const retval = values.map((v, index) => 
  {
    const vl = (v + valueLabelOffset).toString();

    return (
      <MenuItem 
        value={v}
        key={vl}
        >{vl}</MenuItem>
    );
  });

  return retval;
}

export type QNumberSelectProps = {
  label: string
  id: string
  value: number
  values: number[]
  valueLabelOffset: number

  onSetValue: (newValue: number) => void
}

export const QNumberSelect = (props: QNumberSelectProps) => {
  
  const handleChange = (event: SelectChangeEvent) => {
    const newNumber = Number(event.target.value);
    props.onSetValue(newNumber);
  };

  const menuItems = createSelectMenuItems(props.values, props.valueLabelOffset);

  const labelId = props.id + "-select-label";

  return <>
    <Container sx={{
      marginTop: "15px"
      }}>
      <FormControl fullWidth >
        <InputLabel id={labelId}>{props.label}</InputLabel>
        <Select
          labelId={labelId}
          id={props.id + "-select"}
          value={props.value.toString()}
          label={props.label}
          onChange={handleChange}
          sx={{
            paddingInline:2,
            paddingBlock:0.5,
          }}
          >
          {menuItems}
        </Select>
      </FormControl>
    </Container>
  </>
}
