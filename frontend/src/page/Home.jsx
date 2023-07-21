import React from 'react'
import styles from '../style'
import { Navbar} from '../component'

const Home = () => {
    return (
        <div className="bg-primary w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar />
            </div>
            </div>
        
            <div className={`bg-primary flex justify-center items-start`}>
            <div className={`${styles.boxWidth}`}>

            </div>
            </div>
            
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
  
            </div>
            </div>
        </div>
    )
}

export default Home