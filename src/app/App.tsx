import { AppRouter } from './router'
import { AppProviders } from './providers'

export const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}
