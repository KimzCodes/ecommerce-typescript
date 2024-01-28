import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { HeaderBasket } from "@components/eCommerce";
import styles from "./styles.module.css";

const { headerContainer, headerLogo } = styles;

const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>our</span> <Badge bg="info">Ecom</Badge>
        </h1>
        <HeaderBasket />
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="about-us">
                About us
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>login</Nav.Link>
              <Nav.Link>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
