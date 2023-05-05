import React from 'react'
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Welcome to the video games app</h1>
        <h4>Where you can create your Cards with your favorite video game</h4>
        <Link to='/videogames' className={styles.btn}>Start now</Link>
      </div>
    </div>
  )
}
