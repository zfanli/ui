import { resolve } from 'path'
import { type UserConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

// 允许的环境变量前缀
const prefix = ['VITE_', 'SS_']
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default (): UserConfig => {
  return {
    base: '/ui/',

    build: {
      emptyOutDir: true,
      minify: true
      
    },

    envPrefix: prefix,

    plugins: [vue2()],

    define: {
      'process.env': {}
    },

    resolve: {
      alias: [
        {
          find: '@',
          replacement: pathResolve('src') + '/'
        },
      ],

      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
  }
}
