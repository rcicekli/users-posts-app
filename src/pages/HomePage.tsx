import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import logo from '../assets/davincilogo.png'
import { useTheme } from '@mui/material/styles' 

const HomePage = () => {
  const theme = useTheme() 

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'none', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: theme.palette.background.default, // koyu tonlu kutu
          borderRadius: 3,
          boxShadow: '0 8px 16px rgba(229, 124, 31, 0.4)', // turuncu gölge
          py: 6,
          textAlign: 'center',
          color: theme.palette.text.primary,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Site Logo"
          sx={{ width: 150, height: 'auto', mb: 3, mx: 'auto' }}
        />

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold',paddingBottom: 3,color: theme.palette.primary.main }}>
          Giriş Yap
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/admin')}
            sx={{
              
              borderColor: '#e57c1f',
              color:  theme.palette.text.primary,
              fontWeight: 'bold',
              px: 6,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(229, 124, 31, 0.1)',
                borderColor: '#d36e17',
                color: '#d36e17',
              },
              minWidth: 140,
            }}
          >
            Admin Girişi
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate('/user-login')}
            sx={{
              borderColor: '#e57c1f',
              color:  theme.palette.text.primary,
              fontWeight: 'bold',
              px:4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(229, 124, 31, 0.1)',
                borderColor: '#d36e17',
                color: '#d36e17',
              },
              minWidth: 140,
            }}
          >
            Kullanıcı Girişi
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage
