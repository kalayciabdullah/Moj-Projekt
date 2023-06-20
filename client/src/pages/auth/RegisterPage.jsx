import { Button, Carousel, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        message.success("Kayıt işlemi başarılı.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
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
            <img src="/mylogo.png" alt="logo" style={{ height: "100px" }} />
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Nazwa Użytkownika"
              name={"username"}
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
            <Form.Item
              label="Powtóż Hasło"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Wymagane!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Hasła muszą być takie same!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Rejestracja
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Masz już konto ?&nbsp;
            <Link to="/login" className="text-blue-600">
              Zaloguj się
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

export default RegisterPage;
