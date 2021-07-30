import { fetchPosts } from "../../components/GetFiles";
import { useState } from "react";
import styles from "../../styles/Unit.module.css";
import Link from "next/link";
import SweetAlert from "react-bootstrap-sweetalert";
import router, { useRouter } from "next/router";

export const getStaticPaths = async () => {
  const data = await fetchPosts();
  console.log("Data----->", data);
  const paths = [{ id: 1 }];
  if (data) {
    const paths = data.data.data.map((unit) => {
      return {
        params: { id: unit._id },
      };
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const data = await fetchPosts(context.params.id);

  return {
    props: { unit: data.data.data },
  };
};

function createMarkup(obj) {
  return { __html: obj };
}

const checkEnter = (e, value, checkValue, sweetAlertModal, classLink) => {
  if (e.ctrlKey) {
    checkContent(value, checkValue, null, sweetAlertModal, classLink);
  }
};

const checkContent = (
  value,
  checkValue,
  event = null,
  sweetAlertModal,
  classLink = null
) => {
  value = value.toLowerCase();
  for (let i = 0; i < checkValue?.length; i++) {
    checkValue[i] = checkValue[i].toLowerCase();

    if (!value.includes(checkValue[i])) {
      console.log("Esta faltando o valor-> " + checkValue[i]);
      event?.preventDefault();
    } else {
      console.log("Passou!");
      if (classLink) {
        router.push(`${classLink}`);
      }
      sweetAlertModal.show = true;
    }
  }
};

const Classes = ({ unit }) => {
  const router = useRouter();

  const [code, setCode] = useState(unit.placeholderCode);
  const [sweetAlertModal, setSweetAlertModal] = useState({ show: false });

  return (
    <div
      className={styles.masterContainer}
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
    >
      <h1 className={styles.centerText}>{unit.title}</h1>
      <div
        className={styles.descriptionCode}
        dangerouslySetInnerHTML={createMarkup(unit.content)}
      ></div>
      <div className={styles.container}>
        <textarea
          className={styles.textarea}
          placeholder={unit.placeholderCode}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        <div
          className={styles.codePlacement}
          dangerouslySetInnerHTML={createMarkup(code)}
        ></div>
      </div>
      <Link href={`/classes/${unit.classLink}`} passHref={true}>
        <button
          onClick={(e) =>
            checkContent(code, unit.successCodes, e, sweetAlertModal)
          }
        >
          Rodar Código
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
