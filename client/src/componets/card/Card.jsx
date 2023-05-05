import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card(props) {

    return (
        <div className={styles.card} title='Click to see details'>
            <Link to={`/detail/${props.id}`} className={styles.detail}>
                <img src={props.image} alt={props.name}/>
                <h2>{props.name}</h2>
                <h4>{props.genres.join(' - ')}</h4>
            </Link>
        </div>
    )
}

