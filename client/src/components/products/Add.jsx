import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategoria została pomyślnie dodana.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Dodaj Nowy Produkt"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Nazwa Produktu"
          rules={[
            {
              required: true,
              message: "Pole nazwy produktu nie może być puste!",
            },
          ]}
        >
          <Input placeholder="Wprowadź nazwę produktu." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Obraz Produktu"
          rules={[
            {
              required: true,
              message: "Pole zdjęcia produktu nie może być puste!",
            },
          ]}
        >
          <Input placeholder="Wprowadź obraz produktu." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Cena Produktu"
          rules={[
            {
              required: true,
              message: "Pole cena produktu nie może być puste!",
            },
          ]}
        >
          <Input placeholder="Podaj cenę produktu." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Wybierz kategorię"
          rules={[
            { required: true, message: "Pole kategorii nie może być puste!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Utwórz
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
