import styles from './styles.module.scss';
export default function main() {
    return (
        <div className={styles.container}>
            <div className={styles.overlay1}>
                <div className={styles.overlay2}>
                    <div className={styles.infog}>
                    </div>
                    <div className={styles.overlay3}>
                        <div className={styles.column}>
                            Company Profile
                        </div>
                        <div className={styles.column}>
                            License Amount
                        </div>
                        <div className={styles.column}>
                            Pending License Req
                        </div>
                    </div>    


                </div>
                <div className={styles.overlay2}>
                    <div className={styles.scroll}>
                    </div>
                    <div className={styles.overlay3}>
                        <div className={styles.expired}>
                            Expiration Alert:
                        </div>

                    </div>

                    
                    

                </div>
                

            </div>
            
        </div>
    );
}