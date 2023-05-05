import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.boxLanding}>
      <div className={styles.main}>
        <div>
          <h1>Welcome to the video games app</h1>
          <h4>Where you can create your Cards with your favorite video game</h4>
          <Link to='/videogames' className={styles.btn}>Start now</Link>
        </div>
      </div>
    </div>
  )
}
