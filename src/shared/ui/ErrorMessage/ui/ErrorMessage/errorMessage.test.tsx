import { render } from '@testing-library/react'
import React from "react"

import '@testing-library/jest-dom'

import { ErrorMessage, ErrorMessageProps } from './ErrorMessage'

const setUp = (props: ErrorMessageProps) => render(<ErrorMessage {...props} />)

describe('ErrorMessage component', () => {
    it('should render ErrorMessage component with props snapshot', () => {
        const { baseElement } = setUp({ message: 'Test' })

        expect(baseElement).toBeInTheDocument()
    })
})
