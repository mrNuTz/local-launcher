import {PWABadge} from './PWABadge.tsx'
import {CommandCenter} from './CommandCenter.tsx'
import {MainTabs} from './MainTabs.tsx'
import {ColorSchemeToggle} from './ColorSchemeToggle.tsx'
import {MessageBox} from './MessageBox.tsx'
import {CommandButton} from './CommandButton.tsx'
import {ImportNotesDialog} from './ImportNotesDialog.tsx'
import {RegisterDialog} from './RegisterDialog.tsx'

export const App = () => (
  <>
    <MainTabs />
    <ColorSchemeToggle />
    <CommandButton />
    <CommandCenter />
    <ImportNotesDialog />
    <RegisterDialog />
    <PWABadge />
    <MessageBox />
  </>
)
