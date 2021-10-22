import Link from "next/link";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/NavbarDropdownFeatures.module.css";
import {
  FaHome,
  FaInfoCircle,
  FaArrowLeft,
  FaBookReader,
} from "react-icons/fa";

const DropdownComponent = (props) => {
  const router = useRouter();

  const [onCategories, setOnCategories] = useState(false);

  const changeNavbarDropdown = (onOrOff, e, direction) => {
    if (direction === "left") e.target.classList.add(`${styles.animateLeft}`);
    if (direction === "right") e.target.classList.add(`${styles.animateRight}`);

    const interval = setTimeout(() => {
      setOnCategories(onOrOff);
      e.target.classList.remove(e.target.classList[1]);
    }, 500);

    return () => {
      clearTimeout(interval);
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
                onClick={(e) => changeNavbarDropdown(!onCategories, e, "left")}
              >
                <li className={styles.dropdownItem}>Categories</li>
              </a>
            </ul>
          </div>
        ) : (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              <a
                href="#"
                id="aulas"
                onClick={(e) => changeNavbarDropdown(!onCategories, e, "right")}
                className={``}
              >
                <li className={styles.dropdownItem}>
                  <FaArrowLeft size={28}></FaArrowLeft>
                </li>
              </a>
              {props?.props?.categories?.props === undefined
                ? props?.props?.categories.map((e, idx) => (
                    <a
                      href="#"
                      key={idx}
                      onClick={() => router.push(`/categories/${e?._id}`)}
                    >
                      <li className={styles.dropdownItem}>{e?.title}</li>
                    </a>
                  ))
                : props?.props?.categories?.props?.map((e, idx) => (
                    <a
                      href="#"
                      key={idx}
                      onClick={() =>
                        router.push(`/categories/${e?._id}`, undefined, {
                          shallow: true,
                        })
                      }
                    >
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
  const [open, setOpen] = useState(false);

  //props.openDropdown = open;

  let newProps = { ...props, openDropdown: open };

  if (props[0]?.simple === true) {
    return (
      <nav className={styles.navbar}>
        <ul className={styles.navbarNav}>
          <li className={styles.navbarItem}>
            <a
              href="#"
              onClick={() => router.push("/")}
              className={styles.navbarLink}
            >
              <FaHome size={28}></FaHome>
            </a>
          </li>
          <li className={styles.navbarItem}>
            <a href="#Footer" className={styles.navbarLink}>
              <FaInfoCircle size={28}></FaInfoCircle>
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className={styles.navbar}>
        <ul className={styles.navbarNav}>
          <li className={styles.navbarItem}>
            <a
              href="#"
              onClick={() => router.push("/")}
              className={styles.navbarLink}
            >
              <FaHome size={28}></FaHome>
            </a>
          </li>
          <li className={styles.navbarItem}>
            <a
              href="#"
              className={styles.navbarLink}
              onClick={() => setOpen(!open)}
            >
              <FaBookReader size={28}></FaBookReader>
            </a>
          </li>
          <DropdownComponent props={newProps}></DropdownComponent>
          <li className={styles.navbarItem}>
            <a href="#Footer" className={styles.navbarLink}>
              <FaInfoCircle size={28}></FaInfoCircle>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
};

export default NavbarComponent;
