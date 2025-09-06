import { useEffect, useState } from 'react'
import React from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
  Divider,
  Stack,
  Paper,
  Container,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useNavigate } from 'react-router-dom'
import type { Post } from '../types/post'
import type { User } from '../types/user'
import HomeIcon from '@mui/icons-material/Home' // ✅ İKON EKLENDİ
import { useTheme } from '@mui/material/styles' // ✅ EKLENDİ


const UserProfilePage = () => {
      const theme = useTheme() // ✅ EKLENDİ
  
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const userIdNum = Number(userId)

  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const [newTitle, setNewTitle] = useState('')
  const [editingPostId, setEditingPostId] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    const storedPosts = localStorage.getItem('posts')

    if (storedUsers) setUsers(JSON.parse(storedUsers))
    if (storedPosts) setPosts(JSON.parse(storedPosts))

    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('posts', JSON.stringify(posts))
    }
  }, [posts, loading])

  const user = users.find(u => Number(u.id) === userIdNum)

  if (loading) return <Typography sx={{ p: 4 }}>Yükleniyor...</Typography>
  if (!user) return <Typography sx={{ p: 4 }}>Kullanıcı bulunamadı (ID: {userId})</Typography>

  const userPosts = posts.filter(post => post.userId === userIdNum)

  const handleAddPost = () => {
    if (!newTitle.trim()) return

    const newPost: Post = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      userId: userIdNum,
      title: newTitle.trim(),
    }

    setPosts(prev => [newPost, ...prev])
    setNewTitle('')
  }

  const handleDeletePost = (postId: number) => {
    setPosts(prev => prev.filter(p => p.id !== postId))
  }

  const startEditing = (post: Post) => {
    setEditingPostId(post.id)
    setEditingTitle(post.title)
  }

  const handleSaveEdit = () => {
    if (editingPostId === null) return

    setPosts(prev =>
      prev.map(post =>
        post.id === editingPostId ? { ...post, title: editingTitle.trim() } : post
      )
    )
    setEditingPostId(null)
    setEditingTitle('')
  }

  const goToAllPosts = () => {
    navigate(`/user/${userId}/posts`)
  }

  return (
    <Box sx={{ minHeight: '100vh',  bgcolor: theme.palette.background.default, color: theme.palette.text.primary, py: 6 }}>

      <Container maxWidth={false}
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: { xl: '2560px' },
          mx: 'auto',
        }}>
        {/* Üst Satır: Sol ve Sağ */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          {/* ✅ Ana Sayfa Butonu */}
          <Button
            onClick={() => navigate('/')}
            sx={{
              bgcolor: theme.palette.background.default,
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              zIndex: 1000,
              '&:hover': {
                bgcolor: '#ff9933',
                color: '#fff'
              },
              px: { xs: 1, sm: 2 },
              minWidth: { xs: 'unset', sm: 'auto' },
            }}
          >
            <HomeIcon />
          </Button>
          <Button variant="outlined" color="warning" onClick={goToAllPosts}>
            Tüm Postları Gör
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            {user.username}
          </Typography>
        </Box>

        {/* Yeni Post Oluşturma Alanı */}
        <Paper sx={{ bgcolor: theme.palette.background.default, p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#e57c1f' }}>
            Yeni Post Oluştur
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Post Başlığı"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              InputProps={{ style: { color: theme.palette.text.primary} }}
              InputLabelProps={{ style: { color: '#e57c1f' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e57c1f',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff9933',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff9933',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="warning"
              onClick={handleAddPost}
              sx={{
              bgcolor: theme.palette.background.default,
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              zIndex: 1000,
              '&:hover': {
                bgcolor: '#ff9933',
                color: '#fff'
              },
              px: { xs: 1, sm: 2 },
              minWidth: { xs: 'unset', sm: 'auto' },
            }}
            >
              <SendIcon />

            </Button>
          </Stack>
        </Paper>

        {/* Kullanıcının Postları */}
        <Paper sx={{ backgroundColor:  theme.palette.background.default, p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#e57c1f' }}>
            Postların
          </Typography>

          {userPosts.length === 0 ? (
            <Typography color="#bbb">Henüz postun yok.</Typography>
          ) : (
            <List disablePadding>
              {userPosts.map(post => (
                <React.Fragment key={post.id}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      px: 0,
                      py: 1,
                    }}
                  >
                    {editingPostId === post.id ? (
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        alignItems="center"
                        sx={{ width: '100%' }}
                      >
                        <TextField
                          fullWidth
                          value={editingTitle}
                          onChange={e => setEditingTitle(e.target.value)}
                          size="small"
                          InputProps={{ style: { color: theme.palette.text.primary } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e57c1f' },
                              '&:hover fieldset': { borderColor: '#ff9933' },
                              '&.Mui-focused fieldset': { borderColor: '#ff9933' },
                            },
                          }}
                        />
                        <IconButton color="warning" onClick={handleSaveEdit}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={() => setEditingPostId(null)}>
                          <CloseIcon />
                        </IconButton>
                      </Stack>
                    ) : (
                      <>
                        <Typography sx={{ flexGrow: 1, wordBreak: 'break-word', color: theme.palette.text.primary }}>
                          {post.title}
                        </Typography>
                        <Box>
                          <IconButton onClick={() => startEditing(post)} color="warning">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeletePost(post.id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </>
                    )}
                  </ListItem>
                  <Divider sx={{ borderColor: '#333' }} />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default UserProfilePage
