import styles from "./Home.module.css";

import EmailIcon from "../../assets/icons/email-icon.svg?react";
import GithubIcon from "../../assets/icons/github-icon.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin-icon.svg?react";


import { BabylonScene } from "../../components/BabylonScene";

export function Home() {
  return (
    <>
      <section className={styles.container} >
        <h1 className={styles.name}>João Gabriel Leal</h1>
        {/* <p className={styles.subtitle}>Full-Stack Developer</p> */}
        <div className={styles.line} />
        
        <section className={styles.contactSection}> 
        
          <a href="mailto:gabriellealjoao@gmail.com" className={styles.contact}> 
          
            <EmailIcon className={styles.contactIcon} />
            gabriellealjoao
          
          </a>
        
          <a  href="https://github.com/SrLeal42"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contact}
          >
            
            <GithubIcon className={styles.contactIcon} />
            SrLeal42 
          
          </a>
        
          <a 
            href="https://linkedin.com/in/jgl-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contact}
          > 
          
            <LinkedinIcon className={styles.contactIcon} />
            João Gabriel Leal 
          
          </a>
        
        </section>
        
        <div className={styles.line} />
      </section>

      <section className={styles.babylonSection} >
        <BabylonScene />
      </section>
    </>
  );
}
