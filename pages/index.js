import { fetchCategories } from "../components/GetCategories";
import Link from "next/link";
import styles from "../styles/Classes.module.css";
import Head from "next/head";
import NavbarHome from "../components/NavbarHome";
import Category from "../models/Category";

export const getStaticProps = async () => {
  //const data = await fetchCategories();
  let newCategoryData = await Category.find();
  newCategoryData = JSON.parse(JSON.stringify(newCategoryData));

  return {
    props: { classes: newCategoryData },
  };
};
const Home = ({ classes }) => {
  //const [classes, setClasses] = useState(null);
  return (
    <div className={styles.masterContainer}>
      <div className={styles.explainContent}>
        <div className={styles.explainContainer}>
          <NavbarHome props={classes}></NavbarHome>
        </div>
      </div>
      <div className={styles.categoriesContainer}>
        <Head>
          <title>Aprendendo a Codar</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    </div>
  );
};

export default Home;
