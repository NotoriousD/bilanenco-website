export const getDateFromISO = (iso: string) => {
    const date = new Date(iso)
    let day: any = date.getUTCDate()
    let month: any = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day

    return `${day}.${month}.${date.getFullYear()}`
}