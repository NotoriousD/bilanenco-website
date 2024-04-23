import { render } from '@testing-library/react'
import React from "react"

import '@testing-library/jest-dom'

import { Section, Props } from './Section'

const setUp = (props: Props) => render(<Section {...props} />)

describe('ErrorMessage component', () => {
    it('should render ErrorMessage component with props snapshot', () => {
        const { baseElement } = setUp({ title: 'Test' })

        expect(baseElement).toBeInTheDocument()
    })
})
