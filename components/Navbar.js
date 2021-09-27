import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/NavbarDropdownFeatures.module.css";
import { FaHome, FaInfoCircle, FaArrowLeft } from "react-icons/fa";

const DropdownComponent = (props) => {
  const [onCategories, setOnCategories] = useState(false);

  const changeNavbarDropdown = (something, e) => {
    console.log(e.target.classList[1]);
    //USEEFFECT WITH setInterval

    e.target.classList.add(`${styles.animateLeft}`);

    const interval = setTimeout(() => {
      setOnCategories(something);
      e.target.classList.remove(e.target.classList[1]);
    }, 500);

    return () => {
      clearTimeout(interval);

      //Failed to remove
    };
  };

  return (
    <div>
      {props?.props?.openDropdown === true &&
        (onCategories === false ? (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              <a
                href="#"
                id="categories"
                onClick={(e) => changeNavbarDropdown(!onCategories, e)}
              >
                <li className={styles.dropdownItem} data-isOn={onCategories}>
                  Categories
                </li>
              </a>
            </ul>
          </div>
        ) : (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              <a
                href="#"
                id="aulas"
                onClick={(e) => changeNavbarDropdown(!onCategories, e)}
                className={``}
              >
                <li className={styles.dropdownItem}>
                  <FaArrowLeft size={28}></FaArrowLeft>
                </li>
              </a>
              {props?.props?.categories?.props?.map((e, idx) => (
                <a href="#" key={idx}>
                  <li className={styles.dropdownItem}>{e?.title}</li>
                </a>
              ))}
            </ul>
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
