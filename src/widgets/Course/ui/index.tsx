import cn from 'classnames'
import React, { useRef } from 'react'

import { Funnels, getPriceByFunnelDiscount } from 'constants/funnels'

import { ICourse } from 'entities/Courses'

import footerBanner from 'shared/assets/footer.jpg'
import mainBanner from 'shared/assets/main.jpg'

import { getAvailablePlaces } from '../model'

import css from './styles.module.scss'

interface Props extends ICourse {
    funnel?: string | null
    handleOpenModal: (packageId: string) => void
}

export const Course: React.FC<Props> = ({
    funnel = null,
    packages,
    isPresale,
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
                        <div className={css.headerTitle}>WORK<span className={css.accent}>ЖОП</span></div>
                        <div className={css.headerText}> Тижневий онлайн воркшоп з віжуалу, мета котрого полягає аби ви отримали результат у вигляді унікального віжуалу на місяць вперед всього лиш за 5 днів. Отримали сильну базу, здобули практичні навички, розширили ваше бачення, нащупали власний стиль та сенси, зловили віжуал інсайти.</div>
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
                    </div>
                </div>
            </section>
            <section className={css.commonBg} style={{
                backgroundImage: `url(${footerBanner.src})`,
            }}>
                <div className={css.nextContent}>
                    <div className={css.container}>
                        <div className={css.contentList}>
                            <div className={css.contentRow}>
                                <div className={cn(css.contentItem, css.mobile, css.right, css.rightNumPosition)}>
                                    <div className={css.contentItemNum}>4</div>
                                    <div className={cn(css.contentItemTitle, css.accent)}>Реалізація віжуалу</div>
                                    <div className={cn(css.contentItemText, css.accent)}>Секрет реалізації задуманого віжуалу за одну зйомку, рекомендації щодо зйомки: освітленність, чистота, візуальний шум, налаштування, фішки селф-зйомки, додаткові пристрої. Практичне завдання- зйомка.</div>
                                </div>
                                <div className={css.contentItem}></div>
                            </div>
                            <div className={css.contentRow}>
                                <div className={css.contentItem}></div>
                                <div className={cn(css.contentItem, css.mobile, css.noBorder, css.left, css.leftNumPosition)}>
                                    <div className={css.contentItemNum}>5</div>
                                    <div className={cn(css.contentItemTitle, css.accent)}>Готовий віжуал</div>
                                    <div className={cn(css.contentItemText, css.accent)}>Расказиваю і паказиваю як з сирих кадрів реалізовую референс та витягую омріяний віжуал, чим і як користуюсь. Обкладинки рілс, інтеграція контенту в моменті. Конспект з топовими додатками по обробці. Практичне завдання- перевтілення сирих кадрів та складення віжуалу відповідно задуманого віжуалу з рефів.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={css.packages} ref={packagesRef}>
                    <div className={css.container}>
                        <div className={css.packagesList}>
                            {Boolean(packages.length) && packages.map(({ id, name, description, price, available_places }) => {
                                const isDisabled = available_places === 0
                                const { isDiscounted, discountPrice } = getPriceByFunnelDiscount(price, funnel)
                                return (
                                    <div className={css.packagesItem} key={id}>
                                        <div className={css.packagesTitle}>{name}</div>
                                        <div className={css.packagesPrice}>
                                            Ціна: ${discountPrice}
                                            {isDiscounted && (
                                                <span className={css.originalPrice}>${price}</span>
                                            )}
                                        </div>
                                        {/* <div className={css.availablePlaces}>Вільних місць: {available_places > 0 ? available_places : 'немає'}</div> */}
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

