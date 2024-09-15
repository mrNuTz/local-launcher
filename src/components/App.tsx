import {SearchBar} from './SearchBar.tsx'
import {PWABadge} from './PWABadge.tsx'
import {FlexRow} from './misc.tsx'
import {ColorSchemeToggle} from './ColorSchemeToggle.tsx'
import {EngineSelect} from './EngineSelect.tsx'
import {UrlBar} from './UrlBar.tsx'
import {Preview} from './Preview.tsx'
import {CommandCenter} from './CommandCenter.tsx'

export const App = () => (
  <>
    <FlexRow>
      <EngineSelect />
      <SearchBar />
      <ColorSchemeToggle />
    </FlexRow>
    <UrlBar />
    <Preview />
    <CommandCenter />
    <PWABadge />
  </>
)
