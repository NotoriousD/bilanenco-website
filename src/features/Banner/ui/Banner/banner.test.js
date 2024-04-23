import {render} from '@testing-library/react'
import React from 'react'

import { Banner } from './Banner'

const setUp = (props) => render(<Banner {...props} />)

test('should render single banner', () => {
    const { debug } = setUp({ type: 'banner', data: {}, handlerOpenModal: () => {} })

    debug()
})