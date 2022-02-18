import styles from "../styles/HeroComponent.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import codeMan from "../public/WebDevHero.svg";
import Logo from "../public/FinalLogo.png";
import myPhoto from "../public/Asset.png"
import { FaHtml5, FaJs, FaCss3Alt, FaDesktop, FaCode, FaGithubSquare, FaLinkedin } from "react-icons/fa";

const renderNav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.responsiveList}>
        <li className={styles.responsiveLogoContainer}><Image
          alt="Website Logo"
          src={Logo}
          className={styles.responsiveLogo}
        ></Image></li>
        <a className={styles.responsiveLinks} href="#about">
          <li>Sobre</li>
        </a>
        <a className={styles.responsiveLinks} href="#contact">
          <li>Contato</li>
        </a>
        <a className={styles.responsiveLinks} href="#courses">
          <li>Cursos</li>
        </a>
      </ul>
    </nav>
  )
}

const renderHero = () => {
  return (
    <div className={styles.heroContainer}>
      {renderNav()}
      <div className={styles.startNow}>
        <div className={styles.textStartNow}>
          <h1 className={styles.textStartNowH1}>Aprenda a <span className={styles.textStartNowSkills}>programar</span> sites profissionais</h1>
          <h3 className={styles.textStartNowH3}>Ensino gratuito e de qualidade.</h3>
          <a href="#courses">
            <button className={styles.textStartButton} href="#courses">Começe agora</button>
          </a>
        </div>
        <div className={styles.imageStartNow}>
          <Image
            alt="Illustration of an person working on a computer"
            src={codeMan}
            style={{ marginLeft: '6em !important', marginBottom: '2.5em' }}
          ></Image>
        </div>
      </div>
    </div>
  )
}


const renderAboutThisCourse = () => {
  return (
    <div className={styles.aboutContainer} id="about">
      <div className={styles.textContainer}>
        <h1 className={styles.textStartNowH1}>Sobre este site </h1>
      </div>
        <div className={styles.elearningConcept}>
          <div className={styles.elearningChild}>
            <h1 className={styles.textStartNowH1}>Somos um <span className={styles.textStartNowSkills} style={{ color: '#9887ED' }}>e-learning</span></h1>
            <h3 className={styles.textStartNowH3}>Um sistema e-learning é um sistema fundamentado no aprendizado tradicional porém é feito através do viés tecnológico.</h3>
            <a href="#courses">
              <button style={{ width: '200px', borderRadius: '1em' }} className={styles.textStartButton}>Confira os cursos</button>
            </a>
          </div>
          <div className={styles.elearningChildButtons}>
            <div>
              <button className={styles.elearningButton}>
                <FaHtml5 className={styles.elearningButtonLogo}>
                </FaHtml5>
              </button>
              <button className={styles.elearningButton}>
                <FaCss3Alt className={styles.elearningButtonLogo}>
                </FaCss3Alt>
              </button>
            </div>
            <button style={{ width: '100px' }} className={styles.elearningButton}>
              <FaJs className={styles.elearningButtonLogo}>
              </FaJs>
            </button>
          </div>
        </div>
    </div>
  )
}

const checkLogo = (name) => {
  name = name.toLowerCase();
  const components = {
    html5: FaHtml5,
    css: FaCss3Alt,
    js: FaJs
  }
  const SpecificLogo = components[name];
  return <SpecificLogo className={styles.elearningButtonLogo}></SpecificLogo>

}

const renderCourseItem = (category, classes, idx, router) => {


  const filteredClassesByCategory = classes.filter((element) => {
    return element?.category === category?._id;
  })
  return (
    <div className={styles.coursesSubItem} key={idx} onClick={() => {
      router.push(`/categories/${category?._id}`);
    }}>
      <h3>{checkLogo(category?.title)}</h3>
      <h3 className={styles.textStartNowH3}>{category?.title}</h3>
      <h3 className={`${styles.textStartNowH3} ${styles.disappear}`} style={{ color: '#AF9DFD' }}>{filteredClassesByCategory.length}</h3>
    </div>
  )
}

const renderCourses = (categorias, classes, router) => {
  return (
    <div id="courses" className={styles.aboutContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.textStartNowH1}>Cursos</h1>
        <h3 className={styles.textStartNowH3}>Escolha um curso abaixo</h3>
      </div>
      <div className={styles.coursesContainer}>
        <div className={styles.coursesContent}>
          <h3 style={{ marginLeft: '1em' }} className={`${styles.textStartNowH3} ${styles.disappear} ${styles.coursesHead}`}>Logo</h3>
          <h3 style={{ marginLeft: '5em', width: '100px', textAlign: 'center' }} className={`${styles.textStartNowH3} ${styles.coursesHead} ${styles.course}`}>Curso</h3>
          <h3 style={{ marginRight: '1em' }} className={`${styles.textStartNowH3} ${styles.disappear} ${styles.coursesHead}`}>Nº de aulas</h3>
        </div>
        <div className={styles.coursesItem}>

          {categorias.map((item, idx) => (
            renderCourseItem(item, classes, idx, router)
          ))}

        </div>
      </div>
    </div>
  )
}

const renderOurKnowledge = () => {
  return (
    <div id="knowledge" style={{ background: '#1C1D28 ' }} className={styles.aboutContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.textStartNowH1}>Nosso Aprendizado</h1>
      </div>
      <div className={styles.learnCardContainer}>
        <div></div>
        <div className={styles.learnCard}>
          <div style={{ marginTop: '3em' }}>
            <FaDesktop className={styles.elearningButtonLogo}></FaDesktop>
            <h2 className={styles.textStartNowH3}>Criação de sites</h2>
            <h3 style={{ fontSize: '14px' }} className={styles.textStartNowH3}>Desenvolva Sites Profissionais</h3>
          </div>
          <a href="#courses">
            <button style={{ width: '200px', borderRadius: '1em' }} className={styles.textStartButton}>Conheça</button>
          </a>
        </div>
        <div className={styles.learnCard}>
          <div style={{ marginTop: '3em' }}>
            <FaCode className={styles.elearningButtonLogo}></FaCode>
            <h2 className={styles.textStartNowH3}>Programação dinâmica</h2>
            <h3 style={{ fontSize: '14px' }} className={styles.textStartNowH3}>O código é renderizado à medida que o usuário vai digitando.</h3>
          </div>
          <a href="#courses">
            <button style={{ width: '200px', borderRadius: '1em' }} className={styles.textStartButton}>Conheça</button>
          </a>
        </div>
      </div>
    </div>
  )
}

const renderAboutMe = () => {
  return (
    <div id="contact" style={{ background: '#1C1D28 ' }} className={styles.aboutContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.textStartNowH1}>Sobre mim</h1>
      </div>
      <div className={styles.aboutMeCardContainer}>
        <div className={styles.aboutMeCard}>
          <div className={styles.iconHubContainer}>
            <a href='https://www.linkedin.com/in/j%C3%BAlio-c%C3%A9sar-de-moraes-92176b178/' target="_blank" rel="noreferrer">
              <FaLinkedin className={`${styles.iconHub} ${styles.linkedin}`}></FaLinkedin>
            </a>
            <a href='https://github.com/juliocesardemoraes/' target="_blank" rel="noreferrer">
              <FaGithubSquare className={`${styles.iconHub} ${styles.github}`}></FaGithubSquare>
            </a>
          </div>
          <div style={{ borderRadius: '1em' }}>
            <Image
              alt="Site creator photo"
              src={myPhoto}
              style={{ borderRadius: '1em' }}
            ></Image>
          </div>
          <div className={styles.aboutMeFonts}>
            <h1 style={{ color: '#fff' }}>Júlio Moraes</h1>
            <h2 style={{ color: "#AF9DFD" }}>Fullstack Developer</h2>
            <h3 style={{ color: '#fff', width: '60%' }}>Desenvolvedor de interfaces e funcionalidades em web</h3>
          </div>
          <hr style={{ width: '60%' }}></hr>
          <div style={{ width: '70%' }} className={styles.aboutMeFonts}>
            <h1 style={{ color: '#fff' }}>Habilidades</h1>
            <div style={{ color: '#fff' }} className={styles.skillsContainer}>
              <div className={styles.skillsSubContainer}>
                <div className={styles.skillsButtons}><span>UX DESIGNER</span></div>
                <div className={styles.skillsButtons}><span>FRONTEND DEV</span></div>
              </div>
              <div className={styles.skillsSubContainer}>
                <div className={styles.skillsButtons}><span>CSS</span></div>
                <div className={styles.skillsButtons}><span>NODE.JS</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

const HeroComponent = (props) => {
  const router = useRouter();
  return (
    <>
      {renderHero()}
      {renderAboutThisCourse()}
      {renderOurKnowledge()}
      {renderCourses(props?.categorias, props?.classes, router)}
      {renderAboutMe()}
    </>
  );
};
export default HeroComponent;
