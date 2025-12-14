import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Container, Chip, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({ name: '', description: '', poster: '', rating: '', releaseDate: '', duration: '' });
  const [posterFile, setPosterFile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      // Call the main /api/movies route so server can return fallback seed data when DB is empty
      const { data } = await axios.get(`/api/movies?pageNumber=${page}`);
      // Support both response shapes: { movies, page, pages } or an array fallback
      const moviesList = Array.isArray(data) ? data : (data.movies || []);
      setMovies(moviesList);
      setTotalPages((data && data.pages) || 1);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const handleOpen = (movie = null) => {
    if (movie) {
      setEditMode(true);
      let formattedDate = '';
      try {
        formattedDate = movie.releaseDate ? new Date(movie.releaseDate).toISOString().split('T')[0] : '';
      } catch (e) {
        formattedDate = '';
      }
      setCurrentMovie({ ...movie, releaseDate: formattedDate, poster: movie.poster || movie.image || '' });
    } else {
      setEditMode(false);
      setCurrentMovie({ name: '', description: '', poster: '', rating: '', releaseDate: '', duration: '' });
    }
    setPosterFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Use FormData for file upload
      const formData = new FormData();
      formData.append('name', currentMovie.name);
      formData.append('description', currentMovie.description);
      formData.append('rating', currentMovie.rating);
      if (currentMovie.releaseDate) formData.append('releaseDate', currentMovie.releaseDate);
      formData.append('duration', currentMovie.duration);

      // If a file is selected, append it. Otherwise, append the poster URL text if present.
      if (posterFile) {
        formData.append('poster', posterFile);
      } else if (currentMovie.poster) {
        formData.append('poster', currentMovie.poster);
      }

      const uploadConfig = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editMode) {
        await axios.put(`/api/movies/${currentMovie._id}`, formData, uploadConfig);
      } else {
        await axios.post('/api/movies', formData, uploadConfig);
      }
      setOpen(false);
      fetchMovies();
    } catch (error) {
      console.error(error);
      alert('Error saving movie');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`/api/movies/${id}`, config);
        fetchMovies();
      } catch (error) {
        console.error(error);
        alert('Error deleting movie');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#121212', p: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">Admin Dashboard</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
            sx={{ borderRadius: 2, background: 'linear-gradient(45deg, #e50914 30%, #ff5252 90%)' }}
          >
            Add Movie
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={5} sx={{ backgroundColor: '#1e1e1e', borderRadius: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <TableCell sx={{ color: '#aaa', fontWeight: 'bold', width: 300 }}>Movie</TableCell>
                <TableCell sx={{ color: '#aaa', fontWeight: 'bold', width: 120 }}>Rating</TableCell>
                <TableCell sx={{ color: '#aaa', fontWeight: 'bold', width: 120 }}>Duration</TableCell>
                <TableCell sx={{ color: '#aaa', fontWeight: 'bold', width: 160 }}>Release</TableCell>
                <TableCell sx={{ color: '#aaa', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell align="right" sx={{ color: '#aaa', fontWeight: 'bold', width: 120 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie._id || movie.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={movie.poster || 'https://placehold.co/60x90?text=No'} alt={movie.name || 'poster'} style={{ width: 60, height: 90, objectFit: 'cover', borderRadius: 4 }} referrerPolicy="no-referrer" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x90?text=No' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontWeight: 700 }}>{movie.name || movie.title || 'Untitled'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip label={movie.rating ?? '-'} size="small" sx={{ bgcolor: '#ffb400', color: 'black', fontWeight: 'bold' }} />
                  </TableCell>
                  <TableCell sx={{ color: '#ddd' }}>{movie.duration ? `${movie.duration}m` : '-'}</TableCell>
                  <TableCell sx={{ color: '#ddd' }}>{movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell sx={{ color: '#ccc', maxWidth: 400 }}>{movie.description ? (movie.description.length > 120 ? movie.description.slice(0, 120) + '…' : movie.description) : '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(movie)} sx={{ color: '#4fc3f7' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(movie._id || movie.id)} sx={{ color: '#ef5350' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': { color: 'white' },
              '& .Mui-selected': { bgcolor: '#e50914 !important', color: 'white' }
            }}
          />
        </Box>

        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { bgcolor: '#1e1e1e', color: 'white', minWidth: 400 } }}>
          <DialogTitle>{editMode ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="filled"
              value={currentMovie.name}
              onChange={(e) => setCurrentMovie({ ...currentMovie, name: e.target.value })}
              sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="filled"
              value={currentMovie.description}
              onChange={(e) => setCurrentMovie({ ...currentMovie, description: e.target.value })}
              sx={{ textarea: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
            />
            <TextField
              margin="dense"
              label="Poster URL (optional)"
              fullWidth
              variant="filled"
              value={currentMovie.poster}
              onChange={(e) => setCurrentMovie({ ...currentMovie, poster: e.target.value })}
              sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
            />
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="body2" color="#aaa" gutterBottom>Or Upload Image</Typography>
              <input
                accept="image/*"
                type="file"
                onChange={(e) => setPosterFile(e.target.files[0])}
                style={{ color: '#aaa' }}
              />
            </Box>
            <TextField
              margin="dense"
              label="Rating (0-10)"
              type="number"
              fullWidth
              variant="filled"
              value={currentMovie.rating}
              onChange={(e) => setCurrentMovie({ ...currentMovie, rating: e.target.value })}
              sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
            />
            <TextField
              margin="dense"
              label="Release Date"
              type="date"
              fullWidth
              variant="filled"
              InputLabelProps={{ shrink: true }}
              value={currentMovie.releaseDate}
              onChange={(e) => setCurrentMovie({ ...currentMovie, releaseDate: e.target.value })}
              sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
            />
            <TextField
              margin="dense"
              label="Duration (minutes)"
              type="number"
              fullWidth
              variant="filled"
              value={currentMovie.duration}
              onChange={(e) => setCurrentMovie({ ...currentMovie, duration: e.target.value })}
              sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} sx={{ color: '#aaa' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#e50914' }}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminPage;
