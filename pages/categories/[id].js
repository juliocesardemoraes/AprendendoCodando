import styles from "../../styles/Classes.module.css";
import Head from "next/head";
import Link from "next/link";
import listStyles from "../../styles/List.module.css";
import Class from "../../models/Class";
import Category from "../../models/Category";
import dbConnect from "../../util/mongodb";
import dbDisconnect from "../../util/mongodbDisconnect";
import Navbar from "../../components/Navbar";

export const getStaticPaths = async () => {
  let classes = null;
  try {
    dbConnect();
    classes = await Category.find({});
  } catch (err) {
    console.log("Error Have not found any Class! -----> ", err);
  }
  let paths = null;
  if (classes != null) {
    paths = classes?.map((unit, idx) => ({
      params: { id: `${unit?._id}` || idx },
    }));
  }
  dbDisconnect();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let newClassesData = null;
  let newCategoryData = null;
  dbConnect();
  try {
    newClassesData = await Class.find({ category: context.params.id });
    newClassesData = JSON.parse(JSON.stringify(newClassesData));
  } catch (err) {
    console.log("ERROR on fetching classes by category!!--> ", err);
  }

  try {
    newCategoryData = await Category.findById(context.params.id);
    newCategoryData = JSON.parse(JSON.stringify(newCategoryData));
  } catch (err) {
    console.log("ERROR on fetching categories by category!!--> ", err);
  }
  dbDisconnect();

  return {
    props: { classes: newClassesData, category: newCategoryData },
  };
};

const Classes = ({ classes, category }) => {
  return (
    <div className={styles.masterContainer}>
      <Navbar />
      <Head>
        <title>Aulas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.descriptionContainer}>
        <h1 className={`${styles.centerText}`}>{category?.title}</h1>
        <h1 className={`${styles.centerText}`}>Aulas</h1>
        <p className={`${styles.centerText}`}>Escolha a aula desejada</p>
        <p className={`${styles.p3} ${styles.categoryDescription}`}>
          {category?.description}
        </p>
      </div>
      <div className={listStyles.listContainer}>
        {classes?.map((unit) => (
          <Link href={`/classes/${unit._id}`} key={unit._id} passHref={true}>
            <div className={listStyles.card}>
              <h1 className={listStyles.mr2}>{unit.title}</h1>
              <p className={styles.hiddenOnSmallScreen}>{unit.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Classes;
