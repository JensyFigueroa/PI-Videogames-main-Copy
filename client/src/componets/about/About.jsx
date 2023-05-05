import React from 'react'
import styles from './About.module.css'
import react from './img/react.svg'
import javascript from './img/javascript.svg'
import ccs3 from './img/css.svg'
import redux from './img/redux.svg'
import express from './img/express.svg'
import sequelize from './img/sequelize.svg'
import postman from './img/postman.svg'
import postgre from './img/postgresql.svg'
import node from './img/node.png'
import photoPerfil from './img/photo-Perfil.png'

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.boxDescription}>
        <h1>About me</h1>
        <div className={styles.aboutMe}>
          <img src={photoPerfil} alt="" />
          <p>My name is Jensy Figueroa, I have completed the Full Stack Development BootCamp at Henry and this App is my individual project.</p>
        </div>

        <h1>About the app</h1>
        <div className={styles.aboutApp}>
        <p>It is a video game application, in which cards from different games are shown, which we can filter by name, gender, origin and ascending and descending order, you can click on each one and see its details, you can also create your own cards with your favorite games.
        </p>
        <div>
          <h3>
            This application was designed with the following technologies
          </h3>
        </div>
      </div>

      <div className={styles.infoTecnologies}>
        <div className={styles.tecnologies}>
          <img src={react} alt="react" />
          <p>React is an open source Javascript library designed to create user interfaces to make it easy to develop single page applications. It is maintained by Facebook and the free software community.</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={javascript} alt="javascript" />
          <p>JavaScript is an interpreted programming language, a dialect of the ECMAScript standard. It is defined as object-oriented, prototype-based, imperative, weakly-typed, and dynamic.</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={ccs3} alt="" />
          <p>CCS3 is a graphic design language for defining and creating the presentation of a structured document written in a markup language.​</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={redux} alt="" />
          <p>Redux is an open source JavaScript library for managing application state. It is commonly used with other libraries like React or Angular for building User Interfaces. Dan Abramov and Andrew Clark were inspired by another Facebook library, Flux, to create Redux.</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={node} alt="" style={{ width: '44px', height: '50px' }} />
          <p>Node.js is a cross-platform, open source, server layer runtime environment based on the JavaScript programming language, asynchronous, with data I/O in an event-driven architecture, and based on the V8 Node.js engine. Google.</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={express} alt="" style={{ width: '44px', height: '50px' }} />
          <p>Express.js or simply Express is a web application framework for Node.js software, open source and licensed by MIT. It is used to develop web applications and APIs. The original author is TJ Hollowaychuk and the first version was released in 2010.</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={sequelize} alt="" style={{ width: '44px', height: '50px' }} />
          <p>Sequelize is an ORM for Nodejs that will allow you to greatly speed up your developments that include relational databases such as MySQL or Postgress.</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={postman} alt="" />
          <p>Postman is an API platform for developers to design, build, test, and iterate on their APIs. As of February 2023, Postman reports that it has more than 25 million registered users and 75,000 open APIs, which it claims is the world's largest public API hub.</p>
        </div>
        <div className={styles.tecnologies}>
          <img src={postgre} alt="" style={{ width: '44px', height: '50px' }} />
          <p>PostgreSQL, also called Postgres, is an open source, object-oriented relational database management system, released under the PostgreSQL license, similar to BSD or MIT.</p>
        </div>

        </div>
      </div>
    </div >
  )
}
