import cn from 'classnames'
import dynamic from 'next/dynamic'
import React, { useRef } from 'react'

import { getPriceByFunnelDiscount } from 'constants/funnels'

import { ICourse } from 'entities/Courses'

import footerBanner from 'shared/assets/footer.jpg'
import mainBanner from 'shared/assets/main.jpg'
import { getDateFromISO } from 'shared/libs/dates'

import css from './styles.module.scss'

const ResultCarousel = dynamic(() => import('./ResultsCarousel').then(module => module.ResultsCarousel), { ssr: false })

interface Props extends ICourse {
    funnel?: string | null
    handleOpenModal: (packageId: string) => void
}

export const Course: React.FC<Props> = ({
    funnel = null,
    packages,
    isPresale,
    isSale,
    end_sale_date: endSaleDate,
    date,
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
                        <div className={cn(css.startDate, css.accent)}>Дата початку: {date}</div>
                        <div className={css.saleDate}>До {getDateFromISO(endSaleDate)} у вас є змога зробити передзапис на курс (сума передплати: 999 грн)</div>
                        <div className={css.headerText}>Тижневий онлайн курс з віжуалу, мета котрого полягає аби ви отримали результат у вигляді унікального віжуалу на місяць вперед всього лиш за тиждень. Отримали сильну базу, здобули практичні навички, розширили ваше бачення, нащупали власний стиль та сенси, зловили віжуал інсайти.</div>
                        <div className={css.btnWrapper}><button className={css.button} onClick={scrollToPackages}>{isPresale ? 'Передзапис' : 'Записатися'}</button></div>
                    </div>
                </div>
            </div>
            <section className={css.content}>
                <div className={css.container}>
                    <div className={css.contentList}>
                        <div className={css.contentRow}>
                            <div className={css.contentItem}></div>
                            <div className={cn(css.contentItem, css.mobile, css.left, css.leftNumPosition)}>
                                <div className={css.contentItemNum}>1</div>
                                <div className={css.contentItemTitle}>Віжуал анпакінг</div>
                                <div className={css.contentItemText}>Ділюсь своїм баченням віжуалу, розширюю горизонти за допомогою огляду різних авторів та їх сенсів, ознайомлюю з годними кейсами розпакування сенсів. Проходимо детальне віжуал розпакування, котре напрацьоване  роками та доведене до досконалості аби якісно розпакувати вашу особистість, сенси та стиль.</div>
                            </div>
                        </div>
                        <div className={css.contentRow}>
                            <div className={cn(css.contentItem, css.mobile, css.right, css.rightNumPosition)}>
                                <div className={css.contentItemNum}>2</div>
                                <div className={css.contentItemTitle}>Робота з рефами</div>
                                <div className={css.contentItemText}>Руйную стереотипи роботи з референсами, ділюсь методами роботи з ними, аналізуємо роботу інфлюенсерів з рефами, джерела референсів. Візуалізуємо ваші сенси.</div>
                            </div>
                            <div className={css.contentItem}></div>
                        </div>
                        <div className={css.contentRow}>
                            <div className={css.contentItem}></div>
                            <div className={cn(css.contentItem, css.mobile, css.left, css.leftNumPosition)}>
                                <div className={css.contentItemNum}>3</div>
                                <div className={css.contentItemTitle}>Розробка віжуалу</div>
                                <div className={css.contentItemText}>Наглядно ділюсь своєю методологією розробки візуальної концепції з референсів та логікою створення годного віжуалу. Віжуал інстайти, виключення з «правил», робота з кольором та його вижимка, віжуал без кольору, прийоми в візуалі, повітря. Практичне завдання- розробка власного віжуалу з рефів за прикладом з уроку.</div>
                            </div>
                        </div>
                        <div className={css.contentRow}>
                            <div className={cn(css.contentItem, css.mobile, css.right, css.rightNumPosition)}>
                                <div className={css.contentItemNum}>4</div>
                                <div className={cn(css.contentItemTitle)}>Реалізація віжуалу</div>
                                <div className={cn(css.contentItemText)}>Секрет реалізації задуманого віжуалу за одну зйомку, рекомендації щодо зйомки: освітленність, чистота, візуальний шум, налаштування, фішки селф-зйомки, додаткові пристрої. Практичне завдання- зйомка.</div>
                            </div>
                            <div className={css.contentItem}></div>
                        </div>
                        <div className={css.contentRow}>
                            <div className={css.contentItem}></div>
                            <div className={cn(css.contentItem, css.mobile, css.left, css.leftNumPosition)}>
                                <div className={css.contentItemNum}>5</div>
                                <div className={cn(css.contentItemTitle)}>Готовий віжуал</div>
                                <div className={cn(css.contentItemText)}>Расказиваю і паказиваю як з сирих кадрів реалізовую референс та витягую омріяний віжуал, чим і як користуюсь. Обкладинки рілс, інтеграція контенту в моменті. Конспект з топовими додатками по обробці. Практичне завдання- перевтілення сирих кадрів та складення віжуалу відповідно задуманого віжуалу з рефів.</div>
                            </div>
                        </div>
                        <div className={css.contentRow}>
                            <div className={cn(css.contentItem, css.mobile, css.right, css.rightNumPosition)}>
                                <div className={css.contentItemNum}>6</div>
                                <div className={cn(css.contentItemTitle)}>Відеозйомка та монтаж</div>
                                <div className={css.newLesson}>(Новий урок)</div>
                                <div className={cn(css.contentItemText)}>Ми розглянемо різні формати лайстайл та експертних відео і на основі вашого розпакування ви зрозумієте, що і як потрібно знімати саме вам!
                                    На цьому уроці я поділюсь секретами власних відео: налаштування, світло, плани, ракурси, а також покажу, як я роблю свої ролики такими атмосферними: додатки для монтажу, кольорова корекція, кінематеграфічні ефекти.
                                    І це не все! Я поділюся додатками для субтритрів, титрів, чистки звуку аби ваші відео були неперевершеними, а головне- створювалися легко, швидко і в задоволення!</div>
                            </div>
                            <div className={cn(css.contentItem, css.noBorder)}></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={css.carousel}>
                <div className={css.carouselHeader}>
                    <h3 className={cn(css.sectionTitle, css.accent)}>Роботи учнів</h3>
                </div>
                <ResultCarousel />
            </section>
            <section className={css.commonBg} style={{
                backgroundImage: `url(${footerBanner.src})`,
            }}>
                <div className={css.sectionHeader}>
                    <h3 className={cn(css.sectionTitle, css.accent)}>Придбати курс за старими цінами можна до <span>{getDateFromISO(endSaleDate)}</span></h3>
                </div>
                <section className={css.packages} ref={packagesRef}>
                    <div className={css.container}>
                        <div className={css.packagesList}>
                            {Boolean(packages.length) && packages.map(({ id, name, description, price, sale_price, available_places }) => {
                                const isDisabled = available_places === 0
                                const salePrice = isSale ? sale_price : price
                                const { isDiscounted, discountPrice } = getPriceByFunnelDiscount(salePrice, funnel)
                                return (
                                    <div className={css.packagesItem} key={id}>
                                        <div className={css.packagesTitle}>{name}</div>
                                        <div className={css.packagesPrice}>
                                            Ціна: ${discountPrice}
                                            {isDiscounted || isSale && (
                                                <span className={css.originalPrice}>${price}</span>
                                            )}
                                        </div>
                                        {/* <div className={css.availablePlaces}>Вільних місць: {available_places > 0 ? getAvailablePlaces(name, available_places) : 'немає'}</div> */}
                                        <div className={css.benefits} dangerouslySetInnerHTML={{ __html: description }} />
                                        <button className={css.button} onClick={() => handleOpenModal(id)} disabled={isDisabled}>{isPresale ? "Передзапис" : "Придбати"}</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

