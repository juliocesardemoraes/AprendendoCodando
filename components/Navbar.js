import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/NavbarDropdownFeatures.module.css";
import { FaHome, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const DropdownComponent = (props) => {
  const [onCategories, setOnCategories] = useState(false);

  const variants = {
    hidden: { opacity: 0, x: 100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  };

  console.log(props);

  return (
    <div>
      {props?.props?.openDropdown === true &&
        (onCategories === false ? (
          <div className={styles.dropdown}>
            <motion.ul
              variants={variants}
              initial="hidden"
              animate={onCategories ? "hidden" : "enter"}
              className={styles.dropdownList}
            >
              <a href="#" onClick={() => setOnCategories(!onCategories)}>
                <li className={styles.dropdownItem} data-isOn={onCategories}>
                  Categories
                </li>
              </a>
            </motion.ul>
          </div>
        ) : (
          <div className={styles.dropdown}>
            <motion.ul
              variants={variants}
              initial="hidden"
              animate={onCategories ? "enter" : "hidden"}
              className={styles.dropdownList}
            >
              <a href="#" onClick={() => setOnCategories(!onCategories)}>
                <li className={styles.dropdownItem}>
                  <FaArrowLeft size={28}></FaArrowLeft>
                </li>
              </a>
              {props?.props?.categories?.props?.map((e, idx) => (
                <a href="#" key={idx}>
                  <li className={styles.dropdownItem}>{e?.title}</li>
                </a>
              ))}
            </motion.ul>
          </div>
        ))}
    </div>
  );
};

const NavbarComponent = (props) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  //props.openDropdown = open;
  console.log(props);

  let newProps = { ...props, openDropdown: open };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <li className={styles.navbarItem}>
          <a href="#" className={styles.navbarLink}>
            <FaHome size={28}></FaHome>
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a
            href="#"
            className={styles.navbarLink}
            onClick={() => setOpen(!open)}
          >
            Cliq
          </a>
        </li>
        <DropdownComponent props={newProps}></DropdownComponent>
        <li className={styles.navbarItem}>
          <a href="#" className={styles.navbarLink}>
            <FaInfoCircle size={28}></FaInfoCircle>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
