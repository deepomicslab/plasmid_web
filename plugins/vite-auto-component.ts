import AutoComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default function configAutoComponentPlugin() {
    return AutoComponents({
        dts: 'src/typings/auto-components.d.ts',
        resolvers: [NaiveUiResolver(), IconsResolver()],
    })
}
