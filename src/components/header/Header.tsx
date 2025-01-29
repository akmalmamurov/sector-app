import HeaderTop from "./HeaderTop";
import HeaderMenu from "./HeaderMenu";
import Navbar from "../navbar/Navbar";
export const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <HeaderTop />
      <HeaderMenu />
      <Navbar />
    </header>
  );
};
