import React, { ChangeEvent, useState } from "react";
import { TextField, Container, Grid, Stack } from "@mui/material";
import { QButton } from "./QButton";
import { DoValidationResponse, QInputAValueDialog } from "./QInputAValueDialog";


export type QNumberRangeProps = {
  label: string
  value: number
  rangeMin: number
  rangeMax: number
  onNewValue: (value: number) => void
}

export const QNumberRange = (props: QNumberRangeProps) => {

  const [isInvalidTextData, setIsInvalidTextData] = useState(false);
  const [isSetValueDialogOpen, setIsSetValueDialogOpen] = useState(false);
  const [localNumberValue, setLocalNumberValue] = useState(props.value);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const newNumValue = Number(e.target.value);
      if (newNumValue >= props.rangeMin && newNumValue <= props.rangeMax) {
        setLocalNumberValue(newNumValue);
      }
    } catch (e) {
      console.log("NUMBER CONVERSION EXCEPTION");
      console.log(e);
    }
  }

  const onHandleUpdate = (newValue: string): DoValidationResponse => {
    try {
      const newNumValue = Number(newValue);
      if (newNumValue >= props.rangeMin && newNumValue <= props.rangeMax) {
        // setLocalNumberValue(newNumValue);
        return {
          isValidValue: true
        } as DoValidationResponse;
      }
    } catch (e) {
      console.log("NUMBER CONVERSION EXCEPTION");
      console.log(e);
    }

    return {
      isValidValue: false
    } as DoValidationResponse;
  }

  const onHandleCommit = (newValue: string): void => {
    const newNumValue = Number(newValue);
    props.onNewValue(newNumValue);
    setLocalNumberValue(newNumValue);
    setIsSetValueDialogOpen(false);
  }

  // const setNumberValue = () => {
  //   props.onNewValue(localNumberValue);
  // }

  const chooseNumberValue = () => {
    setIsSetValueDialogOpen(true);
  }

  const textValue = localNumberValue.toString();

  return (
    <>
      <QInputAValueDialog
        isOpen={isSetValueDialogOpen} 
        title={"Enter value between " + props.rangeMin + " and " + props.rangeMax}
        description={"Enter value between " + props.rangeMin + " and " + props.rangeMax}
        inputLabel={props.label}
        initValue={textValue}
        commitButtonLabel='Set'
        onHandleCommit={onHandleCommit}
        onHandleClose={() => setIsSetValueDialogOpen(false)}
        doValidation={onHandleUpdate}
        />
{/*         
      <Container
        sx={{
          marginTop: "15px",
        }}
        >
        <Grid container spacing={3}>
          <Grid item>
            <TextField
              disabled
              value={textValue}
              label={props.label}
              variant="outlined" 
              onChange={(event) => handleChange(event)}
              inputProps={{ style: {
                marginLeft: "16px",
                height: "23px",
              }}}
              />
          </Grid>
          <Grid item>
            <QButton 
              disabled={isInvalidTextData} 
              // onClick={setNumberValue}
              onClick={chooseNumberValue}
              sx={{
                width: "100px",
                marginLeft: "16px"
              }}
              >  
                Set
            </QButton>
          </Grid>
        </Grid>
      </Container> */}

      <Container
        sx={{
          marginTop: "15px",
        }}
        >
        <Stack direction="row">
          <TextField
            disabled
            value={textValue}
            label={props.label}
            variant="outlined" 
            onChange={(event) => handleChange(event)}
            inputProps={{ style: {
              marginLeft: "16px",
              height: "23px",
            }}}
            />
          <QButton 
            disabled={isInvalidTextData} 
            // onClick={setNumberValue}
            onClick={chooseNumberValue}
            sx={{
              width: "100px",
              marginLeft: "16px",
              height: "36px",
              marginTop: "6px",
              // alignContent: "center",
            }}
            >  
              Change
          </QButton>
        </Stack>
      </Container>
    </>
  )
}
