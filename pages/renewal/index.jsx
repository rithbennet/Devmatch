import styles from './styles.module.scss';

export default function renewal() {
    return (
        <div className={styles.container}>
            
            <div className={styles.text}>
                Renewal
            </div>
            <div className={styles.overlay}>
                <div className={styles.column}>
                    <div className={styles.overlay2}>
                        <div className={styles.overlay3}>
                    <img src='/kpkt.png' alt='KPKT' className={styles.logo}/>
                    <img src='/ssm.png' alt='KPKT' className={styles.logo}/>
                    </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className = {styles.overlay2}>
                        <form>
                            <div className={styles.overlay4}>
                                <label className={styles.inter_regular}>License Period<br></br></label>
                                <div className={styles.formContainer}>
                                <input className={styles.inter_regular2}
                                    type="number" max={5}
                                    
                                    //onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                                </div>

                                <label className={styles.inter_regular}>Business Name<br></br></label>
                                <div className={styles.formContainer}>
                                <input className={styles.inter_regular2}
                                    type="text" 
                                    required 
                                />
                                
                            </div>

                            <label className={styles.inter_regular}>Registered License Number<br></br></label>
                                <div className={styles.formContainer}>
                                <input className={styles.inter_regular2}
                                    type="number" 
                                    required 
                                />
                                
                            </div>

                            <label className={styles.inter_regular}>Amount to be paid<br></br></label>
                                <div className={styles.formContainer}>
                                <input className={styles.inter_regular2}
                                    type="number" defaultValue={500.00}
                                    required 
                                />
                                
                            </div>

                            <button className={styles.submit} type="submit">
                            <div className={styles.submitText}>
                            Pay Now!
                            </div>
                        </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}