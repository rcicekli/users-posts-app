import { useState } from 'react'
import UsersPage from './UsersPage'
import PostsPage from './PostsPage'
import { useTheme } from '@mui/material/styles';  // bu satırı ekle

import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  
} from '@mui/material'



const AdminPanel = () => {
    const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts')

  const handleChange = (_event: React.SyntheticEvent, newValue: 'posts' | 'users') => {
    setActiveTab(newValue)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: '#fff',
        py: 4
      }}
    >
     
      
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: '#e57c1f', textAlign: 'center', fontWeight: 'bold' }}
        >
          Admin Panel
        </Typography>

        <Paper sx={{ backgroundColor: theme.palette.background.default, mb: 4 }} elevation={3}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            centered
            textColor="inherit"
            indicatorColor="secondary"
            TabIndicatorProps={{ style: { backgroundColor: '#e57c1f' } }}
          >
            <Tab
              label="Postlar"
              value="posts"
              sx={{
                color: activeTab === 'posts' ? '#e57c1f' :  theme.palette.text.primary,
                fontWeight: activeTab === 'posts' ? 'bold' : 'normal'
              }}
            />
            <Tab
              label="Kullanıcılar"
              value="users"
              sx={{
                color: activeTab === 'users' ? '#e57c1f' : 'theme.palette.text.primary',
                fontWeight: activeTab === 'users' ? 'bold' : 'normal'
              }}
            />
          </Tabs>
        </Paper>

        {/* Tab içeriği */}
        <Box>
          {activeTab === 'posts' && <PostsPage isAdmin />}
          {activeTab === 'users' && <UsersPage />}
        </Box>
      </Container>
    </Box>
  )
}

export default AdminPanel
