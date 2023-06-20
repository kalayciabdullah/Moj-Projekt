import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
const PrintInvoice = ({ isModalOpen, setIsModalOpen, client }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      title="Wydrukuj Fakturę"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black"ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div class="flex justify-center py-4">
              <img src="/mylogo.png" alt="logo" style={{ height: "80px" }} />
            </div>
            <div className="invoice-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Sprzedawca:</p>
                  <p>Kalayci Software</p>
                  <p>NIP: 8361934870</p>
                  <p>ul. Okopowa 59</p>
                  <p>01-043 Warszawa</p>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <p className="font-bold text-slate-700">Miejscowość:</p>
                  <p>Warszawa</p>
                  <p className="font-bold text-slate-700 mt-5">
                    Data Wystawienia:
                  </p>
                  <p>{client?.createdAt.substring(0, 10)}</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Nr Faktury:</p>
                  <p>000{Math.floor(Math.random() * 100)}</p>
                  <p className="font-bold text-slate-700 mt-5">
                    Termin Płatnośći
                  </p>
                  <p>13-06-2023</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Nabywca:</p>
                  <p className="text-green-600">{client?.clientName}</p>
                  <p>NIP: 0000000000</p>
                  <p>ul. Rajska 45/60</p>
                  <p>02-146 Warszawa</p>
                </div>
              </div>
            </div>
            <div className="invoice-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Obraz
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      {" "}
                      Tytuł
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden"
                    >
                      {" "}
                      Tytuł
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Cena
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Ilość
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0 sm:table-cell"
                    >
                      Razem
                    </th>
                    </tr>
                </thead>
                <tbody>
                  {client?.cartItems.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Cena {item.price}zł
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Cena {item.price}zł
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price.toFixed(2)}zł</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity).toFixed(2)}zł</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Cena Netto
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Cena Netto</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {client?.subTotal}zł
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">VAT %8</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">VAT %8</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        +{client?.tax}zł
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Do Zapłaty
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Do Zapłaty</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {client?.totalAmount}zł
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Zgodnie z artykułem 455 Kodeksu cywilnego i ustawą o
                    terminach zapłaty w transakcjach handlowych, uprzejmie
                    informujemy, że zgodnie z przepisami obowiązującymi w
                    Polsce, w przypadku braku uregulowania płatności w terminie
                    7 dni od daty wystawienia niniejszej faktury, zostaną
                    naliczone odsetki ustawowe. Zgodnie z informacją
                    udostępnioną przez Narodowy Bank Polski na dzień dzisiejszy,
                    stopy procentowe ustalane przez Politykę Pieniężną Banku
                    Centralnego wynoszą: Stopa referencyjna: 8%, Stopa odsetek
                    ustawowych: 0,5% Pragniemy zaznaczyć, że powyższe stopy
                    procentowe mogą ulec zmianie zgodnie z decyzjami Narodowego
                    Banku Polskiego. Prosimy o zapoznanie się z bieżącymi
                    informacjami na stronie internetowej Banku Centralnego w
                    celu uzyskania najświeższych danych dotyczących stóp
                    procentowych. Zwracamy się z uprzejmą prośbą o uregulowanie
                    płatności w terminie, aby uniknąć konieczności naliczania
                    odsetek. Niniejsza faktura jest dostępna do zapłaty do dnia
                    napisany na górze i zachęcamy do dokonania płatności w
                    wyznaczonym terminie.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Drukuj
        </Button>
      </div>
    </Modal>
  );
};

export default PrintInvoice;
