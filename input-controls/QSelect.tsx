import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Container } from "@mui/material";



type QSelectProps<T> = {
  label: string
  id: string
  value: T
  values: T[]
  valueLabels: string[]
  onSetValue: (newValue: T) => void
}

const createSelectMenuItems = <T extends unknown>(values: T[], valueLabels: string[]) => {
  if (values.length !== valueLabels.length) {
    console.log("MISMATCHING INPUT LENGTHS IN createQSelectItems()");
    return [];
  }

  const retval = valueLabels.map((vl, index) => 
    <MenuItem 
      value={index} 
      key={vl}
      >{vl}</MenuItem>
  );
  return retval;
}

export const QSelect = <T extends unknown>(props: QSelectProps<T>) => {
  
  const handleChange = (event: SelectChangeEvent) => {
    const valueIndex = event.target.value as unknown as number;
    const newValue = props.values[valueIndex];
    props.onSetValue(newValue);
  };

  const valueLabelIndex = props.values.findIndex(v => v === props.value).toString();
  
  const menuItems = createSelectMenuItems(props.values, props.valueLabels);

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
          value={valueLabelIndex}
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
