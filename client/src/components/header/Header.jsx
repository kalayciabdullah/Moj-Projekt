import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./index.css";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Czy na pewno chcesz się wylogować?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Wylogowany.");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
      <div className="logo">
            <Link to="/" className="flex items-center gap-2">
              <img src="/mylogo.png" alt="logo" style={{ height: "50px" }} />
            </Link>
          </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Szukaj Produkt..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link to={"/"} className={`menu-link ${
            pathname === "/" && "active"

          }`}>
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Strona Główna</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link to={"/cart"} className={`menu-link ${
              pathname === "/cart" && "active"

            }`}>
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Koszyk</span>
            </Link>
          </Badge>
          <Link to={"/invoices"} className={`menu-link ${
            pathname === "/invoices" && "active"

          }`}>
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faktury</span>
          </Link>
          <Link to={"/clients"} className={`menu-link ${
            pathname === "/clients" && "active"

          }`}>
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Klienci</span>
          </Link>
          <Link to={"/statistics"} className={`menu-link ${
            pathname === "/statistics" && "active"

          }`}>
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Statystyki</span>
          </Link>
          <div onClick={logOut}>
            <Link className={`menu-link`}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Wyloguj</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link to={"/cart"} className={`menu-link ${
            pathname === "/cart" && "active"

          }`}>
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Koszyk</span>
          </Link>
        </Badge>
        
      </header>
    </div>
  );
};

export default Header;