import React from 'react';
import { Stack, Container } from "@mui/material"
import { ColorPicker } from "material-ui-color"


type QColorPickerProps = {
  label: string
  valueColorHex: string
  onColorChange: (colorHex: string) => void
}


export const QColorPicker = (props: QColorPickerProps) => {
  return (
    <Stack direction="row" 
      spacing={1} 
      sx={{
        // marginRight: 0
      }}
      >
      <Container sx={{
        mr: 2,
        marginRight: 0,
        paddingRight: 0,
        width: "33%",
      }}>
        {props.label}
      </Container>
      <Container>
        <ColorPicker 
          defaultValue={props.valueColorHex} 
          value={props.valueColorHex} 
          onChange={(newColor) => props.onColorChange("#" + newColor.hex)} 
          disableAlpha 
          />
      </Container>
    </Stack>
  )
}
