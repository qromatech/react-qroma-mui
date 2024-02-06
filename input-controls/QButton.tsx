import React from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import { QTheme } from './theme';


type QButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  sx?: SxProps<Theme>;
  autoFocus?: boolean | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
}

const DefaultQButtonSx = {
  color: "white",
  backgroundColor: QTheme.QPurple,
  fontFamily: "Exo",
  fontWeight: "bold",
  textTransform: "none",
  width: "300px",
  ':hover': {
    bgcolor: QTheme.QPurple,
    color: QTheme.Q2,
  },
} as SxProps<Theme>;

export const QButton = (props: QButtonProps) => {
  const mergedSx = {
    ...DefaultQButtonSx,
    ...props.sx,
  } as SxProps<Theme>;

  return (
    <Button
      sx={mergedSx}
      onClick={props.onClick}
      autoFocus={props.autoFocus}
      variant={props.variant}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      href={props.href}
      >
      {props.children}
    </Button>
  );
}
