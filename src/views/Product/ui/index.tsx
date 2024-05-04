import cn from 'classnames'
import dynamic from 'next/dynamic'
import React, { useRef } from 'react'

import { getPriceByFunnelDiscount } from 'constants/funnels'

import { ICourse } from 'entities/Courses'

import footerBanner from 'shared/assets/footer.jpg'
import mainBanner from 'shared/assets/main.jpg'
import { getDateFromISO } from 'shared/libs/dates'

import css from './styles.module.scss'
import { _Product } from 'entities/Courses/model/types'

interface Props extends _Product {
    funnel?: string | null
    handleOpenModal: (packageId: string) => void
}

export const Product: React.FC<Props> = ({
    funnel = null,
    title,
    handleOpenModal,
}) => {
    const packagesRef = useRef<HTMLElement>(null)

    const scrollToPackages = () => {
        packagesRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={css.root}>
            <div className={css.header} style={{
                backgroundImage: `url(${mainBanner.src})`,
            }}>
                <div className={css.headerContent}>
                    <div className={css.container}>
                        <div className={css.headerTitle}>{title}</div>
                        <div className={cn(css.startDate, css.accent)}>Дата початку: { }</div>
                        <div className={css.saleDate}>До 20.05.2024 у вас є змога зробити передзапис на курс (сума передплати: 999 грн)</div>
                        <div className={css.headerText}>Тижневий онлайн курс з віжуалу, мета котрого полягає аби ви отримали результат у вигляді унікального віжуалу на місяць вперед всього лиш за тиждень. Отримали сильну базу, здобули практичні навички, розширили ваше бачення, нащупали власний стиль та сенси, зловили віжуал інсайти.</div>
                        <div className={css.btnWrapper}><button className={css.button} onClick={scrollToPackages}>Купити</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

