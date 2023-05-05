import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../card/Card.jsx'
import styles from './Cards.module.css'

export default function Cards() {
    const games = useSelector(state => state.games);

    const cardsXpage = 20;
    const totalPages = Math.ceil(games.length / cardsXpage); //Obtenemos el numero de paginas a crear por la cantidad total de cards

    let pageNum = [];
    for (let i = 1; i <= totalPages; i++) { //Generamos un for para recorre la cantidad total pagina y devolver como nombre de el boton del paginado
        pageNum.push(i)
    }

    const [numGamesXpage, setNumGamesXpage] = useState([...games].splice(0, cardsXpage));//para cargar en primera instancia las primera 20 cards
    const [currentPage, setCurrentPage] = useState(0);//Verificamos la pagina actual en que nos encontramos

    useEffect(() => { //Para que este atento alguna modificación del estado por algun filtro, nos pueda actualizar las cards
        setNumGamesXpage([...games].splice(0, cardsXpage))
    }, [games])

    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if (prevPage < 0) return;

        const firstIndex = prevPage * cardsXpage;

        setNumGamesXpage([...games].splice(firstIndex, cardsXpage));
        setCurrentPage(prevPage)
    }

    const handlerPage = (e) => {
        const nextPage = e.target.value - 1;
        const firstIndex = nextPage * cardsXpage;

        if (firstIndex === games.length) return;

        setNumGamesXpage([...games].splice(firstIndex, cardsXpage));
        setCurrentPage(nextPage)
    }

    const nextHandler = () => {
        let nextPage;
        if (currentPage < totalPages) {
            nextPage = totalPages - 1
        } else {
            nextPage = currentPage + 1
        }

        const firstIndex = nextPage * cardsXpage;
        if (firstIndex === games.length) {
            setCurrentPage(5);
            return
        };

        setNumGamesXpage([...games].splice(firstIndex, cardsXpage));
        setCurrentPage(nextPage)
    }

    return (
        <div className={styles.containerAll}>
            <div className={styles.containerCards}>
                {numGamesXpage.length > 0 ? numGamesXpage.map((game, i) =>
                    <Card
                        key={i}
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        genres={game.genres}
                        rating={game.rating} />

                ) : <p className={styles.msg}>No cards found with that name</p>}

            </div>
            <div className={styles.containerPagination}>
                <button className={styles.btnPagination} onClick={prevHandler}>{'<< '}</button>
                <div>
                    {pageNum.map((num, i) => <button className={currentPage === i ? styles.btnActive : styles.btnPagination} key={i} style={{ marginRight: '5px' }} onClick={(e) => handlerPage(e)} value={num}>{num}</button>)}
                </div>
                <button className={styles.btnPagination} onClick={nextHandler}>{' >>'}</button>
            </div>
        </div>

    )
}
