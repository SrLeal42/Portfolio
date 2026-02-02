import "../global.css";
import styles from "./Home.module.css";

import EmailIcon from "../../assets/icons/email-icon.svg?react";
import GithubIcon from "../../assets/icons/github-icon.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin-icon.svg?react";
import CurriculoIcon from "../../assets/icons/curriculum-icon.svg?react";

import HTMLIcon from "../../assets/icons/html-icon.svg?react";
import TypeScriptIcon from "../../assets/icons/typescript-icon.svg?react";
import CSSIcon from "../../assets/icons/css-icon.svg?react";
import PythonIcon from "../../assets/icons/python-icon.svg?react";
import JavaIcon from "../../assets/icons/java-icon.svg?react";
import PHPIcon from "../../assets/icons/php-icon.svg?react";
import CSharpIcon from "../../assets/icons/csharp-icon.svg?react";
import SQLIcon from "../../assets/icons/sql-icon.svg?react";
import MongoIcon from "../../assets/icons/mongodb-icon.svg?react";
import NodeIcon from "../../assets/icons/nodejs-icon.svg?react";
import CondaIcon from "../../assets/icons/conda-icon.svg?react";
import GitIcon from "../../assets/icons/git-icon.svg?react";
import BabylonIcon from "../../assets/icons/babylon-icon.svg?react";
import DownArrowIcon from "../../assets/icons/down-arrow-icon.svg?react";


import { BabylonScene } from "../../components/BabylonScene";

export function Home() {
  return (
    <>
      <section className={styles.container} >
        <h1 className={styles.name}>João Gabriel Leal</h1>
        {/* <p className={styles.subtitle}>Full-Stack Developer</p> */}
        <div className={styles.line} />
        
        <section className={styles.contactSection}> 
        
          <a href="mailto:gabriellealjoao@gmail.com"
            className={styles.contact}> 
          
            <EmailIcon className={styles.contactIcon} />
            Email
          
          </a>
        
          <a  href="https://github.com/SrLeal42"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contact}
          >
            
            <GithubIcon className={styles.contactIcon} />
            GitHub
          
          </a>
        
          <a 
            href="https://linkedin.com/in/jgl-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contact}
          > 
          
            <LinkedinIcon className={styles.contactIcon} />
            Linkedin
          
          </a>
                  
          <a 
            href="/curriculo/CurriculoJGL.pdf"
            target="_blank"
            rel="noopener noreferrer"
            // download="Joao_Gabriel_Leal_CV.pdf"
            className={styles.contact}
          > 
          
            <CurriculoIcon className={styles.contactIcon} />
            Curriculo
          
          </a>
        
        
        </section>
        
        <div className={styles.line} />
      
      

        <section className={styles.containerSobreMim}>
        
          <h2 className={styles.subtitleSobreMim} >Sobre Mim </h2>
          <p className={styles.paragraphSobreMim}> 
            Graduando em <strong>Ciência da Computação</strong> pela UniCuritiba, 
            construí minha base profissional atuando como Desenvolvedor Full-Stack na Assembleia Legislativa do Estado do Paraná durante 7 meses. 
            No meu dia a dia, trabalho principalmente com <strong>TypeScript</strong>, <strong>Python</strong>, <strong>Java</strong> e <strong>C#</strong>, 
            aplicando também conhecimentos sólidos em bancos de dados <strong>SQL</strong> e <strong>MongoDB</strong>. 
            Além disso, busco constante aprimoramento técnico, possuindo certificações da Cisco e Oracle em áreas estratégicas, como 
            <strong> <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=926C65CD12A5143FB393585D4C0BF0EDDAB1EB68CF7D0F7D6260C22985D23FBD" target="_blank" rel="noopener noreferrer">OCI AI Foundations</a></strong>, 
            <strong> <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=8841B7A1FA4C990F9E0CFFCABA41C194AEF8BFEB726A1FCDDE604F11449AADF5" target="_blank" rel="noopener noreferrer">OCI Generative AI Professional</a></strong>, 
            <strong> <a href="https://www.credly.com/badges/4cc28690-2cc2-4f20-9dbc-0c0aee457594/public_url" target="_blank" rel="noopener noreferrer">Introdução à Cibersegurança</a></strong> e 
            <strong> <a href="https://www.credly.com/badges/2ff0d961-619f-43d7-95f2-95dc58efb030/public_url" target="_blank" rel="noopener noreferrer">Gestão de Ameaças Cibernéticas</a></strong>.
          </p>
        
        </section>
      
        <section className={styles.containerTechnology}>
          <div title="SQL" aria-label="SQL"> <SQLIcon className={styles.technologyIcon} /></div>
          <div title="MongoDB" aria-label="MongoDB"><MongoIcon className={styles.technologyIcon}/></div>
          <div title="Babylon.js" aria-label="Babylon.js"><BabylonIcon className={`${styles.technologyIcon} ${styles.babylonIcon}`} id="BABY"/></div>
          {/* <div title="React" aria-label="React"><ReactIcon className={styles.technologyIcon}/></div> */}
          <div title="Python" aria-label="Python"><PythonIcon className={styles.technologyIcon} /></div>
          <div title="Java" aria-label="Java"><JavaIcon className={styles.technologyIcon}/></div>
          <div title="HTML" aria-label="HTML"><HTMLIcon className={styles.technologyIcon} /></div>
          <div title="TypeScript" aria-label="TypeScript"><TypeScriptIcon className={styles.technologyIcon} /></div>
          <div title="CSS" aria-label="CSS"><CSSIcon className={styles.technologyIcon} /></div>
          <div title="PHP" aria-label="PHP"><PHPIcon className={styles.technologyIcon} /></div>
          <div title="C#" aria-label="C#"><CSharpIcon className={styles.technologyIcon} /></div>
          <div title="Git" aria-label="Git"><GitIcon className={styles.technologyIcon} /></div>
          <div title="NodeJS" aria-label="NodeJS"><NodeIcon className={styles.technologyIcon} /></div>
          <div title="Conda" aria-label="Conda"><CondaIcon className={styles.technologyIcon} /></div>
        </section>

        
      
      </section>

      <section className={styles.containerProject}>
              <DownArrowIcon className={styles.downArrowIcon}/>
        <h1 className={styles.titleProject}>Projetos</h1>

        <section className={styles.babylonSection} >
          <BabylonScene />
        </section>
      </section>
    </>
  );
}
