import React from 'react'

import css from './errorMessage.module.scss'

export interface ErrorMessageProps {
  message: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className={css.root}>{message}</div>;
}
