import { useState } from 'react';
import styles from '../searchBar/SearchBar.module.css'

export default function SearchBar(props) {

   const [name, setName] = useState(0);

   const handleSearchChange = (e) => {

      let { value } = e.target;

      if (value === '') {
         setName(0);
      }else{
         setName(value)
      }
      
   };

   return (
      <div className={styles.searchBox}>
         <input type="text" className={styles.inputSearch} placeholder="Find a Game ..." onChange={handleSearchChange}/>
         <button className={styles.btnSearchBar}
            onClick={() => props.onSearch(name)}
         >Search</button>
         
      </div>
   );
}



