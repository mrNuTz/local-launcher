import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/spotlight/styles.css'
import {MantineProvider} from '@mantine/core'
import {ModalsProvider} from '@mantine/modals'

import {useSelector} from './state/store.ts'
import {App} from './components/App.tsx'
import {theme} from './theme.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
)

declare global {
  interface Window {
    store: typeof useSelector
  }
}
window.store = useSelector
