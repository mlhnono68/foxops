import { Global, ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { EnterScreen } from './components/EnterScreen/EnterScreen'
import { IncarnationsList } from './routes/incarnations/List'
import { Login } from './routes/login/Login'
import { createGlobalStyles } from './global-styles'
import { useThemeModeStore } from './stores/theme-mode'
import { THEMES } from './styling/themes'
import { CreateIncarnationForm } from './routes/incarnations/CreateForm'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { EditIncarnationForm } from './routes/incarnations/EditForm'

const queryClient = new QueryClient()

function App() {
  const { mode } = useThemeModeStore()
  const theme = THEMES[mode]
  const globalStyles = createGlobalStyles(theme)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EnterScreen />}>
              <Route path="incarnations" element={<IncarnationsList />} />
              <Route path="incarnations/create" element={<CreateIncarnationForm />} />
              <Route path="incarnations/:id" element={<EditIncarnationForm />} />
              <Route path="*" element={<Navigate to="/incarnations" />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
