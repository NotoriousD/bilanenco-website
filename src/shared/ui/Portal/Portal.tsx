import React, { PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const Portal: React.FC<PropsWithChildren> = ({ children }) => {
    const container = useRef(document.createElement('div'));

    useEffect(() => {
        const containerEl = container.current;
        document.body.appendChild(containerEl);

        return () => {
            document.body.removeChild(containerEl);
        };
    }, []);

    return ReactDOM.createPortal(children, container.current);
};