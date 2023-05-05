import React, { useEffect, useState } from 'react'
import styles from './CreateGame.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '../../redux/actions/index.js'

import validate from './validation.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function CreateGame() {
  const [form, setForm] = useState({ name: '', description: '', platforms: [], genres: [], image: '', released: '', rating: '' });
  const [errors, setErrors] = useState({});


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  const handleInputChange = (e) => {
    console.log('handleInputChange ',e.target.value);
    const { name, value, checked } = e.target

    if (name === 'name' || name === 'description' || name === 'image' || name === 'released' || name === 'rating') {
      setForm({ ...form, [name]: value })
    }

    if (name === 'platforms') {
      if (checked) {
        if (!form.platforms.includes(value)) {
          setForm({ ...form, platforms: [...form.platforms, value] });
        } else {
          e.target.checked = true;
        }
      } else {
        setForm({ ...form, platforms: form.platforms.filter(p => p !== value) });
      }
    }

    if (name === 'genres') {
      if (checked) {
        if (!form.genres.includes(value)) {
          setForm({ ...form, genres: [...form.genres, value] });
        } else {
          e.target.checked = true;
        }

      } else {
        setForm({ ...form, genres: form.genres.filter(p => p !== value) });
      }
    }

  }

  const handleBlur = (e) => {
    handleInputChange(e);
    setErrors(validate(form))
  }
  
  const genres = useSelector(state => state.genres)

  const platforms = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Linux', 'PSP', 'Wii', 'Game Boy Advance', 'Atari 7800', 'Dreamcast', 'Game Gear', 'Web', 'Jaguar', 'EGA CD', 'Genesis', 'Nintendo 64']

  const [checkPlatforms, setCheckPlatforms] = useState(false)
  const [checkGenres, setCheckGenres] = useState(false)

  const showCheckboxes = (e) => {
    if (e.target.id === 'platforms') {
      setCheckPlatforms(true)
    } else {
      setCheckPlatforms(false)
    }

    if (e.target.id === 'genres') {
      setCheckGenres(true)
    } else {
      setCheckGenres(false)
    }

    if (e.target.id === '') {
      setCheckPlatforms(false)
      setCheckGenres(false);
    }

  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviar el form ', form);

    axios.post('http://localhost:3001/videogames', form)

    alert('The card was created correctly...!');
    navigate('/videogames');
  }

  let i = 0;

  return (
    <div className={styles.containerAll}>
      <div className={styles.containerForm} onClick={showCheckboxes}>
        <h1 style={{ textAlign: 'center' }}>Create new game</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.field} style={{ gap: '8px' }}>
            <label id="label">Name game
              <input id="input" name="name" type="text" onChange={handleInputChange} onBlur={handleBlur} value={form.name} required />
              {errors.name && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.name}</p>}
            </label>
            <label id="label" >Game description
              <textarea id="input" type="textarea" name="description" onChange={handleInputChange} onBlur={handleBlur} value={form.description} required></textarea>
              {errors.description && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.description}</p>}
            </label>
          </div>

          <div className={styles.field} style={{ gap: '8px' }} >
            <label htmlFor="platforms">Platforms
              <select id='platforms'>
                {form.platforms.length === 0 ? <option>Select options</option>:  <option>{form.platforms.join(' - ')}</option>}
              </select>

              <div className={styles.overSelect}>
                <div  style={checkPlatforms ? { display: 'block' } : { display: 'none' }} className={styles.checkBoxes}>
                  {platforms.map(platform =>
                    <label name='checkbok' key={++i} className={styles.field}>
                      <input  type="checkbox" name='platforms' onChange={handleInputChange} onBlur={handleBlur} value={platform} /> {` ${platform}`}
                    </label>
                  )}
                </div>
              </div>
                  {errors.platforms && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.platforms}</p>}
            </label>

            <label htmlFor="genres">Genres
              <select id='genres'>
              {form.genres.length === 0 ? <option>Select options</option>:  <option>{form.genres.join(' - ')}</option>}
              </select>

              <div className={styles.overSelect}>
                <div style={checkGenres ? { display: 'block' } : { display: 'none' }} className={styles.checkBoxes}>
                  {genres.map(genre =>
                    <label name='checkbok' key={++i}>
                      <input type="checkbox" name='genres' onChange={handleInputChange} onBlur={handleBlur} value={genre.name} /> {`  ${genre.name}`}
                    </label>
                  )}
                </div>
              </div>
                  {errors.genres && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.genres}</p>}
            </label>

          </div>

          <div className={styles.field} style={{ gap: '8px' }}>
            <label id="label">Image link
              <input id="input" type="text" name="image" placeholder='Game url' onChange={handleInputChange} onBlur={handleBlur} value={form.image} required />
              {errors.image && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.image}</p>}
            </label>
          </div>

          <div className={styles.field} style={{ gap: '8px' }}>
            <label id="label">release date
              <input id="input" type="date" name="released" onChange={handleInputChange} onBlur={handleBlur} value={form.released} required />
              {errors.released && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.released}</p>}
            </label>
            <label id="label">Rating
              <input id="input" type="number" min="1" max="5" step="0.1" name="rating" onChange={handleInputChange} onBlur={handleBlur} value={form.rating} required />
              {errors.rating && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.rating}</p>}
            </label>
          </div>
          <button className={styles.btn} type="submit">Create game</button>
        </form>
      </div>
    </div>


  )
}
