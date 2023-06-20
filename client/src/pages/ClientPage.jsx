import { Button, Input, Space, Spin, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header.jsx";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const ClientPage = () => {
  const [invoiceItems, setInvoiceItems] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Szukaj
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetuj
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Flitr
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Zamknij
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/invoices/get-all");
        const data = await res.json();
        setInvoiceItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    getInvoices();
  }, []);

  const columns = [
    {
      title: "Nazwa Klienta",
      dataIndex: "clientName",
      key: "clientName",
      ...getColumnSearchProps("clientName"),
    },
    {
      title: "Nr NIP",
      dataIndex: "clientNIP",
      key: "clientNIP",
      ...getColumnSearchProps("clientNIP"),
    },
    {
      title: "Nr Telefonu",
      dataIndex: "clientPhoneNumber",
      key: "clientPhoneNumber",
      ...getColumnSearchProps("clientPhoneNumber"),
    },
    {
      title: "Data Wystawienia",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Klienci</h1>
      {invoiceItems ? (
        <div className="px-6">
          <Table
            dataSource={invoiceItems}
            columns={columns}
            bordered
            pagination={false}
            scroll={{
              x: 1000,
              y: 300,
            }}
            rowKey="_id"
          />
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default ClientPage;
