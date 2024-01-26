import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap/";
import { Footer, Header } from "@components/layout";

import styles from "./styles.module.css";

const { container, wrapper } = styles;
const MainTemplate = () => {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default MainTemplate;
