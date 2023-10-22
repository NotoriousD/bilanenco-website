import { render } from '@testing-library/react';
import React from "react";

import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage component', () => {
    it('should render ErrorMessage component with props snapshot', () => {
        const { baseElement } = render(<ErrorMessage message="Test" />);

        expect(baseElement).toBeInTheDocument();
    });

});
