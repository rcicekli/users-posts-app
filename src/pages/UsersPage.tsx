import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Button
} from '@mui/material'

import SendIcon from '@mui/icons-material/Send'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { fetchUsers } from '../services/users'
import type { User } from '../types/user'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

import { useTheme } from '@mui/material/styles'

const UsersPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  // State'ler ve useEffect'ler (aynı kalıyor)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [editingUsername, setEditingUsername] = useState('')
  const [editingEmail, setEditingEmail] = useState('')

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers))
        setLoading(false)
      } catch {
        localStorage.removeItem('users')
        loadUsersFromApi()
      }
    } else {
      loadUsersFromApi()
    }

    function loadUsersFromApi() {
      fetchUsers()
        .then(data => {
          setUsers(data)
          localStorage.setItem('users', JSON.stringify(data))
        })
        .finally(() => setLoading(false))
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users, loading])

  const handleAddUser = () => {
    if (!newName.trim() || !newUsername.trim() || !newEmail.trim()) return
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: newName.trim(),
      username: newUsername.trim(),
      email: newEmail.trim()
    }
    setUsers(prev => [newUser, ...prev])
    setNewName('')
    setNewUsername('')
    setNewEmail('')
  }

  const handleDeleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  const startEditing = (user: User) => {
    setEditingUserId(user.id)
    setEditingName(user.name)
    setEditingUsername(user.username)
    setEditingEmail(user.email)
  }

  const handleSaveEdit = () => {
    if (editingUserId === null) return
    setUsers(prev =>
      prev.map(user =>
        user.id === editingUserId
          ? { ...user, name: editingName, username: editingUsername, email: editingEmail }
          : user
      )
    )
    setEditingUserId(null)
    setEditingName('')
    setEditingUsername('')
    setEditingEmail('')
  }

  if (loading)
    return (
      <Typography sx={{ p: 4, color: theme.palette.text.primary }}>
        Yükleniyor...
      </Typography>
    )

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 4 }}>
          Kullanıcılar
        </Typography>

        {/* ✅ Responsive Form */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            handleAddUser()
          }}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 4
          }}
        >
          {/* Ana Sayfa Butonu */}
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}`,
                fontWeight: 'bold',
                width: '100%',
                height: '40px',
                '&:hover': { bgcolor: '#ff9933', color: theme.palette.background.default }
              }}
            >
              <HomeIcon />
            </Button>
          </Box>

          {/* Form Alanları */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="İsim"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{
                  input: { color: theme.palette.text.primary },
                  '& .MuiInputLabel-root': { color: '#e57c1f' },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: theme.palette.background.default,
                    '& fieldset': {
                      borderColor: '#e57c1f'
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff9933'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff9933'
                    }
                  }
                }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Kullanıcı Adı"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{
                  input: { color: theme.palette.text.primary },
                  '& .MuiInputLabel-root': { color: '#e57c1f' },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: theme.palette.background.default,
                    '& fieldset': {
                      borderColor: '#e57c1f'
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff9933'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff9933'
                    }
                  }
                }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              size="small"
              type="email"
              label="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{
                  input: { color: theme.palette.text.primary },
                  '& .MuiInputLabel-root': { color: '#e57c1f' },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: theme.palette.background.default,
                    '& fieldset': {
                      borderColor: '#e57c1f'
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff9933'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff9933'
                    }
                  }
                }}
            />
          </Box>

          {/* Ekle Butonu */}
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Tooltip title="Ekle">
              <IconButton
                type="submit"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.primary.main,
                  height: '40px',
                  width: '100%',
                  border: `1px solid ${theme.palette.primary.main}`,
                  '&:hover': { bgcolor: '#ff9933', color: '#fff' },
                  borderRadius: 1,
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* ✅ Tablo */}
        <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.default }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>İsim</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Kullanıcı Adı</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{user.id}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {editingUserId === user.id ? (
                      <TextField
                        size="small"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {editingUserId === user.id ? (
                      <TextField
                        size="small"
                        value={editingUsername}
                        onChange={(e) => setEditingUsername(e.target.value)}
                      />
                    ) : (
                      user.username
                    )}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {editingUserId === user.id ? (
                      <TextField
                        size="small"
                        value={editingEmail}
                        onChange={(e) => setEditingEmail(e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUserId === user.id ? (
                      <>
                        <Tooltip title="Kaydet">
                          <IconButton onClick={handleSaveEdit} size="small" sx={{ color: theme.palette.primary.main }}>
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="İptal">
                          <IconButton onClick={() => setEditingUserId(null)} size="small" sx={{ color: '#aaa' }}>
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Düzenle">
                          <IconButton onClick={() => startEditing(user)} size="small" sx={{ color: theme.palette.primary.main }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Sil">
                          <IconButton onClick={() => handleDeleteUser(user.id)} size="small" sx={{ color: '#f44336' }}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}

export default UsersPage
