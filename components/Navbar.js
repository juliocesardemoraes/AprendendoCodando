import { useRouter } from "next/router";
import styles from "../styles/NavbarComponent.module.css";
import { FaHome } from "react-icons/fa";

const NavbarComponent = () => {
  const router = useRouter();

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.listContainer}>
        <li className={styles.navItem}>
          <a href="#" className={styles.linkIcon}>
            <span className={styles.linkText}>
              <FaHome className={styles.icon}></FaHome>
            </span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.linkIcon}>
            <span className={styles.linkText}>
              <FaHome className={styles.icon}></FaHome>
            </span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.linkIcon}>
            <span className={styles.linkText}>
              <FaHome className={styles.icon}></FaHome>
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default NavbarComponent;
