import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserLoginPage from './pages/UserLoginPage'
import PostsPage from './pages/PostsPage'
import UserProfilePage from './pages/UserProfilePage'
import AdminPanel from './pages/AdminPanel'

import { useThemeContext } from './ThemeContext'
import { IconButton, Box } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const App = () => {
  const { mode, toggleTheme } = useThemeContext()

  return (
    <>
      {/* Tema toggle butonu */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1300,
        }}
      >
        <IconButton onClick={toggleTheme} color="inherit" size="large">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {/* Sayfalar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/user/:userId" element={<UserProfilePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/user/:userId/posts" element={<PostsPage />} />
      </Routes>
    </>
  )
}

export default App
