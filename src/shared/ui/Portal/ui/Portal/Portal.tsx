import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import css from './portal.module.scss'

export const Portal: React.FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<Element | null>(null)
    const [mounted, setMounted] = useState<boolean>(false)
    
    useEffect(() => {
      ref.current = document.querySelector<HTMLElement>("#portal")
      setMounted(true)
    }, [])

    return (mounted && ref.current) ? createPortal(<div className={css.overlay}>{children}</div>, ref.current) : null
};