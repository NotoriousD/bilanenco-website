import React from 'react';

import css from './loader.module.scss'

export const Loader: React.FC = () => {
    return (
        <svg
            data-testid="spinner"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            version="1.1"
        >
            <g
                id="ic_loading"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g id="Oval-2" opacity="0.2" fill={'#000'}>
                    <path
                        d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z"
                        id="Oval"
                    />
                </g>
                <path
                    d="M12,0 C13.1045695,0 14,0.8954305 14,2 C14,3.1045695 13.1045695,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.1045695 3.1045695,14 2,14 C0.8954305,14 0,13.1045695 0,12 C0,5.372583 5.372583,0 12,0 Z"
                    id="Oval"
                    fill={'#000'}
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>
        </svg>
    );
};
