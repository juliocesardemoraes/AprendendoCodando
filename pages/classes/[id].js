//Inicializando váriaveis e importando bibliotecas, hooks, etc.
import { useState } from "react";
import styles from "../../styles/Unit.module.css";
import Link from "next/link";
import SweetAlert from "react-bootstrap-sweetalert";
import router, { useRouter } from "next/router";
import dbConnect from "../../util/mongodb";
import dbDisconnect from "../../util/mongodbDisconnect";
import Class from "../../models/Class";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";

let wrongAnswers = [];

// Pegando as rotas necessárias para o componente
export const getStaticPaths = async () => {
  dbConnect();
  let paths = { id: "1" };
  let classes = null;
  try {
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

// Enviando as props ao componente buscando as classes no banco
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

// Injetando o html de forma que o conteúdo não mude quando renderizado
// isso torna o site vulnerável a ataques XSS porém é útil para o
// propósito do site.
// https://zhenyong.github.io/react/tips/dangerously-set-inner-html.html
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

//Nesta função o texto que necessita ser complementado passa por um regex
//e retorna para o usuário. O regex é necessário pois são caracteres
//especiais
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

// Função para checar se as respostas estão corretas
const checkContent = (
  value,
  checkValue,
  event = null,
  sweetAlertModal,
  classLink = null
) => {
  value = value.toLowerCase();
  let validAnswer = true;
  wrongAnswers = [];

  for (let i = 0; i < checkValue?.length; i++) {
    checkValue[i] = checkValue[i].toLowerCase();
    if (!value.includes(checkValue[i])) {
      wrongAnswers.push(checkValue[i]);
      event?.preventDefault();
      validAnswer = false;
    }
  }

  // Se a resposta for certa entrar no if
  if (validAnswer) {
    sweetAlertModal.show = true;
    Cookies.set("classes", classLink, { sameSite: "Lax" });
    if (classLink) {
      router.push(`${classLink}`);
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
  const simple = [{ simple: true }];

  const [code, setCode] = useState(unit.placeholderCode);
  const [sweetAlertModal, setSweetAlertModal] = useState({ show: false });
  return (
    <div className={styles.masterContainer}>
      <Navbar {...simple}></Navbar>
      <h1 className={styles.centerText}>{unit.title}</h1>
      <div
        className={styles.descriptionCode}
        dangerouslySetInnerHTML={createMarkup(unit.content)}
      ></div>
      <div className={styles.container}>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            value={code || ""}
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
            checkContent(
              code,
              unit.successCodes,
              e,
              sweetAlertModal,
              unit?.classLink
            )
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
