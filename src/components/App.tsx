import {PWABadge} from './PWABadge.tsx'
import {CommandCenter} from './CommandCenter.tsx'
import {MainTabs} from './MainTabs.tsx'
import {OpenNote} from './OpenNote.tsx'
import {ColorSchemeToggle} from './ColorSchemeToggle.tsx'
import {MessageBox} from './MessageBox.tsx'

export const App = () => (
  <>
    <MainTabs />
    <ColorSchemeToggle />
    <OpenNote />
    <CommandCenter />
    <PWABadge />
    <MessageBox />
  </>
)
