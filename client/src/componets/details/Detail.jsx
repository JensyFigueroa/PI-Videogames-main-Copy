import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import styles from './Detail.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { detailId } from '../../redux/actions';

export default function Detail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(detailId(id))
  },[dispatch, id])

  const game = useSelector(state => state.detailId)
  
  return (
    <div style={{ backgroundImage: `url(${game.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundColor: 'rgba(0,0,0,.55)', boxShadow: 'inset 0 4px 18.38vw 11vw rgba(0,0,0,.7)' }}>
      <section className={styles.containerDetails}>
        <div className={styles.details}>
          <div className={styles.field}>
            <h1>{game.name}</h1>
            <p>{game.description}</p>
          </div>
          <div className={styles.field}>
            <h3>Platforms: &nbsp;<span className={styles.data}>{game.platforms}</span></h3>
            <h3>Release: &nbsp;<span className={styles.data}>{game.released}</span></h3>
            <h3>Rating: &nbsp;<span className={styles.data}>{game.rating}</span></h3>
          </div>
        </div>
        <div className={styles.containerImage}>
          <img src={game.image} alt={game.name} className={styles.image} />
          <button className={styles.btn} onClick={() => navigate('/videogames')}>Back to Home</button>
        </div>

      </section>
    </div>
  )
}




