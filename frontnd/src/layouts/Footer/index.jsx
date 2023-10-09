import logo from "../../assets/argentBankLogo.png";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src={logo} alt="Argent Bank Logo" class="logo" />
      </div>
      <ul className="footer-nav">
        <li className="footer-nav__item">About us</li>
        <li className="footer-nav__item">Contact</li>
        <li className="footer-nav__item">Blog</li>
      </ul>
      <ul className="footer-nav">
        <li className="footer-nav__item">Careers</li>
        <li className="footer-nav__item">Support</li>
        <li className="footer-nav__item">Privacy Policy</li>
      </ul>
      <div className="footer__cta">
        <p className="footer__cta__p">© Argent Bank. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
