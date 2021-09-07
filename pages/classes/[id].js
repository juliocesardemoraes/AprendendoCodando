import { fetchPosts } from "../../components/GetFiles";
import { useState, useEffect } from "react";
import styles from "../../styles/Unit.module.css";
import Link from "next/link";
import SweetAlert from "react-bootstrap-sweetalert";
import router, { useRouter } from "next/router";
import dbConnect from "../../util/mongodb";
import dbDisconnect from "../../util/mongodbDisconnect";
import Class from "../../models/Class";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

let wrongAnswers = [];

export const getStaticPaths = async () => {
  const data = await fetchPosts();
  let paths = { id: "1" };
  let classes = null;
  try {
    dbConnect();
    classes = await Class.find({});
  } catch (err) {
    console.log(err);
  }
  if (classes != null) {
    paths = classes.map((unit) => {
      return {
        params: { id: `${unit._id}` },
      };
    });
  }
  dbDisconnect();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  dbConnect();

  let data = null;
  try {
    data = await Class.findById(context?.params?.id);
  } catch (err) {
    console.log("Error Finding a Class by the id");
  }
  if (!data) {
    return {
      notFound: true,
    };
  }
  dbDisconnect();

  data = JSON.parse(JSON.stringify(data));

  return {
    props: { unit: data },
  };
};

function createMarkup(obj) {
  return { __html: obj };
}

/*
const checkEnter = (e, value, checkValue, sweetAlertModal, classLink) => {
  if (e.ctrlKey) {
    checkContent(value, checkValue, null, sweetAlertModal, null, classLink);
  }
};
*/

function escapeHtml(text) {
  text = text.toString();
  let map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

const checkContent = (
  value,
  checkValue,
  event = null,
  sweetAlertModal,
  classLink = null
) => {
  value = value.toLowerCase();
  let invalidOption = false;
  wrongAnswers = [];
  for (let i = 0; i < checkValue?.length; i++) {
    checkValue[i] = checkValue[i].toLowerCase();
    if (!value.includes(checkValue[i])) {
      wrongAnswers.push(checkValue[i]);
      event?.preventDefault();
      invalidOption = true;
    }
  }
  for (let i = 0; i < checkValue?.length; i++) {
    if (invalidOption == false) {
      sweetAlertModal.show = true;

      if (classLink) {
        router.push(`${classLink}`);
      }
    }
  }

  if (wrongAnswers.length > 0) {
    event?.preventDefault();
    Swal.fire(
      `O seu código falta os seguintes valores ${escapeHtml(wrongAnswers)}`
    );
  }
};

const Classes = ({ unit }) => {
  const router = useRouter();

  const [code, setCode] = useState(unit.placeholderCode);
  const [sweetAlertModal, setSweetAlertModal] = useState({ show: false });
  return (
    <div
      className={styles.masterContainer}
      /*
      onKeyDown={(e) => {
        switch (e.key) {
          case "Enter":
            checkEnter(
              e,
              code,
              unit.successCodes,
              sweetAlertModal,
              unit.classLink
            );
            break;
          default:
            console.log("Nadie");
        }
      }}
      */
    >
      <h1 className={styles.centerText}>{unit.title}</h1>
      <div
        className={styles.descriptionCode}
        dangerouslySetInnerHTML={createMarkup(unit.content)}
      ></div>
      <div className={styles.container}>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            placeholder={unit?.placeholderCode || ""}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>
        <div
          className={styles.codePlacement}
          dangerouslySetInnerHTML={createMarkup(code)}
        ></div>
      </div>
      <Link href={`/classes/${unit.classLink}`} passHref={true}>
        <button
          className={styles.buttonSubmit}
          onClick={(e) =>
            checkContent(code, unit.successCodes, e, sweetAlertModal)
          }
        >
          Rodar Código{" "}
          <SweetAlert
            show={sweetAlertModal.show}
            title="Parabéns você completou esta aula.Você está sendo redirecionado para a próxima aula"
            text=""
            type="success"
            onConfirm={() => setSweetAlertModal({ show: false })}
          />
        </button>
      </Link>
    </div>
  );
};
export default Classes;
