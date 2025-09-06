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
import { useTheme } from '@mui/material/styles' // ✅ EKLENDİ

const UsersPage = () => {
  const navigate = useNavigate()
  const theme = useTheme() // ✅ EKLENDİ

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
      } catch (error) {
        console.error('LocalStorage verisi okunamadı:', error)
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
        .catch(err => {
          console.error('Kullanıcılar alınırken hata:', err)
        })
        .finally(() => setLoading(false))
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users, loading])

  if (loading)
    return (
      <Typography sx={{ p: 4, color: theme.palette.text.primary }}>
        Yükleniyor...
      </Typography>
    )

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

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 4 }}>
          Kullanıcılar
        </Typography>

        <Box
          component="form"
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'nowrap',
            mb: 4,
            '& .MuiTextField-root': {
              bgcolor: theme.palette.background.default,
              borderRadius: 1,
              flex: '1 1 30%',
              '& .MuiInputBase-root': {
                height: '40px',
                color: theme.palette.text.primary
              },
              '& label': {
                color: theme.palette.primary.main
              },
              '& label.Mui-focused': {
                color: '#ff9933'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff9933'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff9933'
              }
            },
            '& > .add-button': {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              px: 2,
              borderRadius: 1,
              height: '40px',
              alignSelf: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: '#ff9933' },
              whiteSpace: 'nowrap'
            }
          }}
          onSubmit={e => {
            e.preventDefault()
            handleAddUser()
          }}
        >
          {/* Ana Sayfa Butonu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}`,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#ff9933',
                  color: '#fff'
                },
                px: { xs: 1, sm: 2 },
                minWidth: { xs: 'unset', sm: 'auto' }
              }}
            >
              <Box sx={{height: '25px', display: { xs: 'none', sm: 'block' } }}>
                <HomeIcon />
              </Box>
            </Button>
          </Box>

          <TextField
            size="small"
            label="İsim"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            size="small"
            label="Kullanıcı Adı"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            size="small"
            type="email"
            label="Email"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />

          <Tooltip title="Paylaş">
            <Box sx={{
                              backgroundColor: theme.palette.background.default,
                              color: theme.palette.primary.main,
                              height: '40px',
                             border: `1px solid ${theme.palette.primary.main}`,
                              '&:hover': { bgcolor: '#ff9933',
                                color: '#fff' },
                              borderRadius: 1,
                            }}component="button" type="submit" className="add-button" aria-label="Kullanıcı ekle">
              <SendIcon />
            </Box>
          </Tooltip>
        </Box>

        <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.default }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold', color: theme.palette.primary.main }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: theme.palette.primary.main }}>İsim</TableCell>
                <TableCell sx={{fontWeight: 'bold', color: theme.palette.primary.main }}>Kullanıcı Adı</TableCell>
                <TableCell sx={{fontWeight: 'bold', color: theme.palette.primary.main }}>Email</TableCell>
                <TableCell sx={{fontWeight: 'bold', color: theme.palette.primary.main }}>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{user.id}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {editingUserId === user.id ? (
                      <TextField
                        size="small"
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)}
                        sx={{
                          input: { color: theme.palette.text.primary },
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.primary.main },
                            '&:hover fieldset': { borderColor: '#ff9933' },
                            '&.Mui-focused fieldset': { borderColor: '#ff9933' }
                          }
                        }}
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
                        onChange={e => setEditingUsername(e.target.value)}
                        sx={{
                          input: { color: theme.palette.text.primary },
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.primary.main },
                            '&:hover fieldset': { borderColor: '#ff9933' },
                            '&.Mui-focused fieldset': { borderColor: '#ff9933' }
                          }
                        }}
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
                        onChange={e => setEditingEmail(e.target.value)}
                        sx={{
                          input: { color: theme.palette.text.primary },
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '& fieldset': { borderColor: theme.palette.primary.main },
                            '&:hover fieldset': { borderColor: '#ff9933' },
                            '&.Mui-focused fieldset': { borderColor: '#ff9933' }
                          }
                        }}
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
