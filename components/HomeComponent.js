import styles from "../styles/HomeComponent.module.css";
import Image from "next/image";
import codeMan from "../public/coding.svg";
import { FaBook } from "react-icons/fa";
import Select from "react-select";
import { useRouter } from "next/router";
import Navbar from "./Navbar.js";

//Aqui está o componente Navbar que está sendo exportado para a rota principal
//Esta Nav é o componente maior onde estão listadas as categorias

const HomeComponent = (categorias) => {
  const router = useRouter();

  let opt = [];
  let tempOption = {};
  categorias.props.map(
    (unit) => (
      (tempOption = {}),
      (tempOption.value = unit._id),
      (tempOption.label = unit.title),
      (opt = [...opt, tempOption])
    )
  );

  let props = [];
  props.route = "home";
  props.categories = categorias;
  props.main = true;

  return (
    <div>
      <div className={styles.containerImage}>
        <Navbar {...props} />
        <div className={styles.introduction}>
          <h1 className={styles.logoName}>
            Aprendendo a Codar
            <FaBook></FaBook>
          </h1>
          <p className={styles.paragraphIntroduction}>
            Para assistir as aulas vá na aba de busca logo abaixo. E escolha uma
            matéria
          </p>
          <Select
            className={styles.selectContainer}
            options={opt}
            instanceId="long-value-select"
            onChange={(e) => {
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
export default HomeComponent;
