import styles from './styles.module.scss';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * SiteHeader component
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function SiteHeader() {
    const [selection, setSelection] = useState(null);
    const [active, setActive] = useState(false);

    const page = {
        pages: [
            { name: "Home", url: "/" },
            { name: "License", url: "/license" },
            { name: "Renewal", url: "/renewal" },
            { name: "User Profile", url: "/profile" },
        ],
    };

    const router = useRouter();

    useEffect(() => {
        if (active) {
            setActive(false);
        }
    }, [router.asPath]);

    function toggleActive() {
        setActive(!active);
    }

    function getSelectionClass(index) {
        if (selection == null) {
            return "";
        } else if (selection == index) {
            return styles.selected;
        } else {
            return styles.unselected;
        }
    }

    function handleOnClick(index) {
        if (selection == index) {
            setSelection(null);
        } else {
            setSelection(null);
            setTimeout(() => setSelection(index), 300);
        }
    }

    function onSubmitDone() {
        router.push("/thank-you");
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.overlay2}>
                    <div className={styles.overlay}>
                            <div className={styles.column1}>
                                <img src="/logo.png" alt="logo" className={styles.logo} />
                            </div>
                            <div className={styles.column}>
                                <Link href="/main" className={styles.link}>Home</Link>
                            </div>
                            <div className={styles.column}>
                                <Link href="/license" className={styles.link}>License</Link>
                            </div>
                            <div className={styles.column}>
                                <Link href="/renewal" className={styles.link}>Renewal</Link>
                            </div>
                            <div className={styles.column2}>
                                <Link href="/profile" className={styles.link}>Profile</Link>
                            </div>
                        </div>
                    
                </div>

                
                
                </div>
            </div>
       
    );
}
