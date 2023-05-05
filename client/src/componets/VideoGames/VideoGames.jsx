import React, { useEffect, useState } from 'react'
import styles from './VideoGames.module.css'
import Cards from '../cards/Cards.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { orderCards, filterGenres, getGameName, getGames, getGenres, filterOrigin, } from '../../redux/actions/index.js'
import SearchBar from '../searchBar/SearchBar.jsx'
import spinner from './Spinner.gif'


export default function VideoGames() {

  const [origin, setOrigin] = useState()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch])

  function onSearch(name) {
    dispatch(getGameName(name))
  }

  const stateLoading = useSelector(state => state.loading)

  const genres = useSelector(state => state.genres)

  return (
    <div>
      <div className={styles.section}>
        <h1>Find or create your favorite game </h1>
        <p>Live the best experience in Game On</p>
      </div>

      <div className={styles.containerSearch}>
        <SearchBar onSearch={onSearch} />


        <div className={styles.boxFilter}>
        <div className={styles.filter}>
          <label>Genres:</label>
          <select onChange={(e) => dispatch(filterGenres(e.target.value))}>
            <option>Select Option</option>
            {genres.map((e, i) => <option value={e.name} key={i}>{e.name}</option>)}
          </select>
        </div>

        <div className={styles.filter}>
          <label>Origin:</label>
          <select onChange={(e) => dispatch(filterOrigin(e.target.value))}>
            {['Select Option','Api', 'Local'].map((e, i) => <option value={e} key={i}>{e}</option>)}
          </select>
        </div>

        <div className={styles.filter}>
          <label>Order By:</label>
          <select onChange={(e) => dispatch(orderCards(e.target.value))} >
            {['Select Option', 'Ascendente', 'Descendente'].map((e, i) => <option value={e} key={i}>{e}</option>)}
          </select>
        </div>
        </div>


      </div>

      {stateLoading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <img src={spinner} alt="" />
      </div> : <Cards />
      }
    </div>
  )
}
