import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

const CreateInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/invoices/add-invoice",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(
              2
            ),
            cartItems: cart.cartItems,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (res.status === 200) {
        message.success("Faktura została wystawiona pomyślnie.");
        dispatch(reset());
        navigate("/invoices");
      }
    } catch (error) {
      message.danger("Coś poszło nie tak.");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Wystaw Fakturę"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Nazwa Klienta"
          name={"clientName"}
          rules={[
            {
              required: true,
              message: "Wymagane",
            },
          ]}
        >
          <Input placeholder="Imię i Nazwisko lub Nazwa Firmy" />
        </Form.Item>
        <Form.Item
          rules={[{ required: false }]}
          name={"clientNIP"}
          label="Nr NIP"
        >
          <Input placeholder="Napisz Nr NIP" maxLength={11} />
        </Form.Item>
        <Form.Item label="Adres" name={"clientAdres"}>
          <Input placeholder="Napisz Adres" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"clientPhoneNumber"}
          label="Nr Telefonu"
        >
          <Input placeholder="Napisz Numer Telefonu" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Sposób Płatności"
          rules={[{ required: true }]}
          name={"paymentMode"}
        >
          <Select placeholder="Wybierz...">
            <Select.Option value="Gotówka">Gotówka</Select.Option>
            <Select.Option value="Karta">Karta</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Cena Netto</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}zł</span>
          </div>
          <div className="flex justify-between my-2">
            <span>VAT %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              zł
            </span>
          </div>
          <div className="flex justify-between">
            <b>Do Zapłaty</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              zł
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Zamów
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateInvoice;
