import React from 'react';

export interface IMenuButtonProps {
  text: string;
  onClick?: () => void;
  startIcon?: React.ReactNode;

  isActive: boolean;
}
