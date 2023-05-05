import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import img from './icono.jpg'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClasses = `${isScrolled ? styles.fixed : styles.navbar}`;

  /* Menu hamburgesa */ 
 const [isOpen, setIsOpen] = useState(false )

  return (
    <div className={navbarClasses}>
      <div className={styles.logo}><Link to='/'><img src={img} alt="" className={styles.img} /></Link></div>
      <div className={`${styles.items} ${isOpen && styles.open}`}>
        <NavLink to='/videogames' className={({ isActive }) => (isActive ? styles.active : styles.link)}>Home</NavLink>
        <NavLink to='/createGame' className={({ isActive }) => (isActive ? styles.active : styles.link)}>Create Game</NavLink>
        <NavLink to='/about' className={({ isActive }) => (isActive ? styles.active : styles.link)}>About</NavLink>
      </div>
      <div className={`${styles.navToggle} ${isOpen && styles.open} `} onClick={()=>setIsOpen(!isOpen  )}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* <Link to='/'><img src={img} alt=""  className={styles.img}/></Link>
      <div className={styles.gridItemMenu}>
        <NavLink to='/videogames' className={({ isActive }) => (isActive ? 'active' : 'link')}>Home</NavLink>
        <NavLink to='/createGame' className={({ isActive }) => (isActive ? 'active' : 'link')}>Create Game</NavLink>
        <NavLink to='/about' className={({ isActive }) => (isActive ? 'active' : 'link')}>About</NavLink>
      </div> */}
    </div>
  )
}
