import Image from 'next/image'
import React from "react"

import InstagramIcon from 'shared/assets/instagram.svg'
import TelegramIcon from 'shared/assets/telegram.svg'

import css from './styles.module.scss'

export default function ThankYouPage() {

    return <div className={css.root}>
        <div className={css.content}>
            <div className={css.title}>Дякую за замовлення</div>
            <div className={css.text}>Незабаром вам надійде лист на пошту з посиланням на &quot;Інспобуком&quot;</div>
            <div className={css.info}>Якщо виникнуть якісь питання, напишіть мені будь-ласка</div>
            <div className={css.links}>
                <a href="https://t.me/bilanenco" className={css.link}>
                    <Image
                        priority
                        src={TelegramIcon}
                        alt="Telegram"
                    />
                </a>
                <a href="https://instagram.com/bilanenco?igshid=MzRlODBiNWFlZA==" className={css.link}>
                    <Image
                        priority
                        src={InstagramIcon}
                        alt="Instagram"
                    />
                </a>
            </div>
        </div>
    </div>;
}
