import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Zalogpwany");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Użytkownik nie znaleziony!");
      } else if (res.status === 403) {
        message.error("Hasło nieprawidłowe!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Coś poszło nie tak.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#2180ed] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Kompatybilność ze Wszystkimi Urządzeniami"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="Statystyki"
                  desc="Powszechne Statystyki"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Szczęście Klienta"
                  desc="Zadowoleni Klienci na Koniec Doświadczenia"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Panel Administratora"
                  desc="Łatwe Zarządzanie z Jednego Miejsca"
                />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <div class="flex justify-center py-4">
            <img src="/mylogo.png" alt="logo" style={{ height: "200px" }} />
          </div>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Wymagane!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Hasło"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Wymagane!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Zapamiętaj mnie</Checkbox>
                <Link>Nie Pamiętasz Hasła?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Zaloguj się
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Nie Masz Konta?&nbsp;
            <Link to="/register" className="text-blue-600">
              Zarejestruj się
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
