import { Container } from "../container";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

export const Footer = () => {
  return (
    <footer className="bg-cerulean pt-[36px]">
      <Container>
        <FooterTop />
        <FooterBottom />
      </Container>
    </footer>
  );
};

export default Footer;
