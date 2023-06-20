import { Badge, Input } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active-menu" : "";
  };

  return (
    <div className="border-b mb-6" style={{ backgroundColor: "#f5f5f5" }}>
      <header
        className="py-4 px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <div className="top-section flex items-center justify-between w-full mb-4 md:mb-0">
          <div className="logo">
            <Link to="/" className="flex items-center gap-2">
              <img src="/mylogo.png" alt="logo" style={{ height: "50px" }} />
            </Link>
          </div>
          <div className="header-search flex-1 mx-4">
            <Input
              size="large"
              placeholder="Szukaj Produkt..."
              prefix={<SearchOutlined />}
              className="rounded-full pl-5 w-full"
              style={{ border: "2px solid #1890ff", fontSize: "16px" }}
            />
          </div>
          <div className="koszyk md:hidden">
            <Badge count={1} offset={[-3, 8]} className="flex">
              <Link
                to={"/cart"}
                className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${isActive(
                  "/cart"
                )}`}
                style={{
                  color: "#333",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                <ShoppingCartOutlined
                  className="text-2xl"
                  style={{ color: "#1890ff" }}
                />
                <span className="md:text-xs text-{10px}">Koszyk</span>
              </Link>
            </Badge>
          </div>
        </div>

        <div className="menu-links flex justify-between items-center gap-10 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link
            to={"/"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${isActive(
              "/"
            )}`}
            style={{
              color: "#333",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <HomeOutlined
              className="md:text-3xl text-2xl"
              style={{ color: "#1890ff" }}
            />
            <span className="md:text-sm text-xs mt-1 hover:shadow-md">
              Strona Główna
            </span>
          </Link>

          <Badge count={1} offset={[-3, 8]} className="hidden md:flex">
            <Link
              to={"/cart"}
              className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${isActive(
                "/cart"
              )}`}
              style={{
                color: "#333",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <ShoppingCartOutlined
                className="md:text-3xl text-2xl"
                style={{ color: "#1890ff" }}
              />
              <span className="md:text-sm text-xs mt-1 hover:shadow-md">
                Koszyk
              </span>
            </Link>
          </Badge>
          <Link
            to={"/invoices"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${isActive(
              "/invoices"
            )}`}
            style={{
              color: "#333",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <CopyOutlined
              className="md:text-3xl text-2xl"
              style={{ color: "#1890ff" }}
            />
            <span className="md:text-sm text-xs mt-1 hover:shadow-md">
              Faktury
            </span>
          </Link>
          <Link
            to={"/clients"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${isActive(
              "/clients"
            )}`}
            style={{
              color: "#333",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <UserOutlined
              className="md:text-3xl text-2xl"
              style={{ color: "#1890ff" }}
            />
            <span className="md:text-sm text-xs mt-1 hover:shadow-md">
              Klienci
            </span>
          </Link>
          <Link
            to={"/statistics"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${isActive(
              "/statistics"
            )}`}
            style={{
              color: "#333",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <LineChartOutlined
              className="md:text-3xl text-2xl"
              style={{ color: "#1890ff" }}
            />
            <span className="md:text-sm text-xs mt-1 hover:shadow-md">
              Statystyki
            </span>
          </Link>
          <Link
            to={"/logout"}
            className={`menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all ${isActive(
              "/logout"
            )}`}
            style={{
              color: "#333",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <LogoutOutlined
              className="md:text-3xl text-2xl"
              style={{ color: "#1890ff" }}
            />
            <span className="md:text-sm text-xs mt-1 hover:shadow-md">
              Wyloguj
            </span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
