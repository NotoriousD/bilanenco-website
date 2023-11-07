import { Button } from 'shared/ui/Button'
import css from 'shared/styles/404/styles.module.scss'

export default function Custom404() {
    return (
        <main className={css.root}>
            <h1>Сторінка не знайдена</h1>
            <Button as="a" href='/'>На головну</Button>
        </main>
    )
}