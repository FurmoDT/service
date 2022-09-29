export const TCtoSec = (tc) => {
    const t = tc.split(':')
    return Number(t[0]) * 60 * 60 + Number(t[1]) * 60 + Number(t[2].replace(',', '.'))
}
