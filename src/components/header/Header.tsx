import HeaderTop from "./HeaderTop";
import HeaderMenu from "./HeaderMenu";
import Navbar from "../navbar/Navbar";
export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <HeaderTop />
      <HeaderMenu />
      <Navbar />
    </header>
  );
};
