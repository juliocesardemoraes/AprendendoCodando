import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import codeMan from "../public/coding.svg";
import { FaBook } from "react-icons/fa";
import Select from "react-select";
import { useRouter } from "next/router";

//Aqui está o componente Navbar que está sendo exportado para a rota principal
//Esta Nav é o componente maior onde estão listadas as categorias

const NavbarHome = (categorias) => {
  const router = useRouter();

  const opt = [];
  let tempOption = {};
  {
    categorias.props.map(
      (unit, idx) => (
        (tempOption.value = unit._id),
        (tempOption.label = unit.title),
        opt.push(tempOption)
      )
    );
  }

  return (
    <div>
      <nav className={styles.navContainer}>
        <Link href="/">
          <h1 className={`${styles.ml_2} ${styles.logo}`}>Home</h1>
        </Link>
        <a href="#categories">
          <h1 className={`${styles.ml_2} ${styles.font_medium}`}>Categorias</h1>
        </a>
        <Link href="/">
          <h1 className={`${styles.ml_2} ${styles.font_medium}`}>Contato</h1>
        </Link>
      </nav>
      <div className={styles.containerImage}>
        <div className={styles.introduction}>
          <h1 className={styles.logoName}>
            Aprendendo a Codar
            <FaBook></FaBook>
          </h1>

          <p>
            Para assistir as aulas vá na aba de busca logo abaixo. E escolha uma
            matéria
          </p>
          <Select
            options={opt}
            instanceId="long-value-select"
            onChange={(e, selected) => {
              router.push(`/categories/${e.value}`);
            }}
          />
        </div>
        <div className={styles.imageResponsive}>
          <Image
            alt="Illustration of an person working on a computer"
            src={codeMan}
            className={styles.imageResponsive}
          ></Image>
        </div>
      </div>
    </div>
  );
};
export default NavbarHome;
