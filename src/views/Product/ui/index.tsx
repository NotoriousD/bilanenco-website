import cn from 'classnames'
import Image from "next/image"
import React, { useRef } from 'react'

import { _Product } from 'entities/Courses/model/types'

import mainBanner from '../assets/bg.png'
import coverImage from '../assets/cover.jpg'
import contentImage from '../assets/content.jpg'

import css from './styles.module.scss'
import { getPriceByCurrency } from 'shared/ui/Currencies'

interface Props extends _Product {
    funnel?: string | null
    handleOpenModal: (packageId: string) => void
}

export const Product: React.FC<Props> = ({
    funnel = null,
    title,
    id,
    price,
    currency,
    handleOpenModal,
}) => {

    const packagesRef = useRef<HTMLElement>(null)

    const scrollToPackages = () => {
        packagesRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={css.root}>
            <div className={css.header}>
                <Image
                    alt="background"
                    src={mainBanner}
                    placeholder="blur"
                    quality={100}
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                    }}
                />
                <div className={css.headerContent}>
                    <div className={css.container}>
                        <div className={css.headerTitle}>{title}</div>
                        <div className={css.headerText}>
                            <span>Інспобук</span> - електронна книга з літнього сезонного контенту. Ціль данної книги - надихнути вас, зробити вашу роботу над блогом легкою та приємною, сформувати вашу надивленість в актуальне русло та подарувати більше часу на літній відпочинок офлайн, так як велика частина роботи вже виконана за вас🤍🕊️
                            <div className={css.more} onClick={scrollToPackages}>Детальніше</div>
                        </div>
                        <div className={css.btnWrapper}><button className={css.button} onClick={() => handleOpenModal(id)}>Купити за {getPriceByCurrency(price, currency)}</button></div>
                    </div>
                </div>
            </div>
            <div className={css.content}>
                <div className={css.container}>
                    <div className={css.imageList}>
                        <Image
                            src={coverImage}
                            alt={'Cover'}
                            quality={100}
                            width={320}
                        />
                        <Image
                            src={contentImage}
                            alt={'Content'}
                            quality={100}
                            width={320}
                        />
                    </div>
                </div>
            </div>
            <section className={css.content} ref={packagesRef}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <h3 className={css.sectionTitle}>Для кого?</h3>
                    </div>
                    <div className={css.text}>
                        <ul>
                            <li>Для тих, хто витрачає години в пошуках референсів та ідеї для блогу;</li>
                            <li>Для тих, хто закидує ведення блогу, має проблеми з регулярністю;</li>
                            <li>Для тих, хто витрачає нерви на приміряння фото в стрічку, не може гармонійно скласти її, видаляє та архівує, топчеться на місці;</li>
                            <li>Для тих, кому важко просуватися, чия статистика залишає бажати кращого, пости та рілс не залучають нову аудиторію органічно, таргет бере шалені гроші.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className={css.content}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <h3 className={css.sectionTitle}>Що ви отримаєте?</h3>
                    </div>
                    <div className={css.text}>
                        <ul>
                            <li>Близько 500-т актуальних, креативних та простих в реалізації референсів на все літо! Вне залежності чи ви проводитимете літо вдома, в місті, за містом чи біля моря- референси є на все!</li>
                            <li>100 ідей для рілс влітку, котрі дадуть можливість органічного просування завдяки актуальним темам на широку аудиторію, розкриють вашу особистість в блозі: цінності та ролі;</li>
                            <li>Відео - туторіал «Алгоритм створення літного віжуалу», слідуючи котрому покроково ви легко створите естетичну та змістовну стрічку мрії;</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

