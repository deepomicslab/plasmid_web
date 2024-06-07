import { defineConfig } from 'windicss/helpers'
import windi from './src/windi'

export default defineConfig({
    darkMode: 'class',
    attributify: true,
    shortcuts: {},
    theme: { extend: windi },
})
