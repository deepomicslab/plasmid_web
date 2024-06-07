import colors from 'windicss/colors'

import { BaseTheme } from 'windicss/types/interfaces'

const windi: Partial<BaseTheme> = {
    // https://www.tailwindcss.cn/docs/customizing-colors
    colors: {
        primary: '#1c95e9',
        'primary-dark': '#1587d7',
        'primary-darker': '#1379bf',
        'primary-darkest': '#106aa8',
        'primary-light': '#33a0eb',
        'primary-lighter': '#4aabee',
        'primary-lightest': '#62b6f0',
        info: colors.gray['400'],
        error: colors.rose['400'],
        light: colors.light['900'],
        tip: '#e8863d',
        dark: '#113854',
    },
    fontSize: {
        /** default */
        // xs: '0.75rem',
        // sm: '0.875rem',
        // base: '1rem',
        // lg: '1.125rem',
        // xl: '1.25rem',
        // ...
        /** custom */
        h1: '2.5rem',
        h2: '2.25rem',
        h3: '2rem',
        h4: '1.75rem',
        h5: '1.5rem',
        h6: '1.25rem',
        p: '1rem',
        lp: '1.125rem', // larger p
        sp: '0.875rem', // smaller p
    },
}

export default windi as {
    colors: SSRecord
    fontSize: SSRecord
}
