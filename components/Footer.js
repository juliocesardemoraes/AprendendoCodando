import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import ProfilePicture from "../public/ProfilePicture.jpg";
import Background from "../public/Background.jpg";
import styles from "../styles/Footer.module.css";

const NavbarComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.card} ${styles.glassmorphism}`}>
        <Image
          alt="Website Author Photo"
          src={ProfilePicture}
          className={styles.imageResponsive}
        ></Image>
        <h1>Júlio César</h1>
        <h2 className={styles.card_profession}>Fullstack developer</h2>
        <ul className={styles.list}>
          <li className={styles.navbarItem}>
            <a
              href="https://www.linkedin.com/in/j%C3%BAlio-c%C3%A9sar-de-moraes-92176b178/"
              className={`${styles.glow_effect} ${styles.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className={styles.glow_effect} size={40}></FaLinkedin>
            </a>
          </li>
          <li className={styles.navbarItem}>
            <a
              href="https://www.youtube.com/channel/UCzKXCjwGfCVVj4QprhXA1VQ"
              className={styles.youtube}
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube size={40}></FaYoutube>
            </a>
          </li>
          <li className={styles.navbarItem}>
            <a
              href="https://github.com/juliocesardemoraes"
              target="_blank"
              rel="noreferrer"
              className={styles.github}
            >
              <FaGithub size={40}></FaGithub>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default NavbarComponent;
