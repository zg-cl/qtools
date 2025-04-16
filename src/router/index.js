import { createRouter, createWebHashHistory
} from 'vue-router'
import MainLayout from '@/components/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', redirect: '/json' },
      { path: '/json', name: 'JsonFormat', component: () => import('@/views/JsonTool.vue') },
      { path: '/jsonbase', name: 'JsonFormatBase', component: () => import('@/views/JsonToolBase.vue') },
      { path: '/url', name: 'UrlCodec', component: () => import('@/views/UrlTool.vue') },
      { path: '/sm2', name: 'SM2Crypto', component: () => import('@/views/SM2Tool.vue') },
      { path: '/image', name: 'ImageCompress', component: () => import('@/views/ImageTool.vue') },
      { path: '/ssl', name: 'SSLCheck', component: () => import('@/views/SSLCheckTool.vue') },
      { path: '/color', name: 'ColorPicker', component: () => import('@/views/ColorPickerTool.vue') },
      { path: '/:pathMatch(.*)*', redirect: '/json' }
    ]
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})