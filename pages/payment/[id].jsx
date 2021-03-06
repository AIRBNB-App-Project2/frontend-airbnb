import DateRangePicker from "../../components/DateRangePicker";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { HiChevronLeft } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../../components/navbar';
import Loading from "../../components/loading";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Index() {

  const router = useRouter();
  const {id} = router.query;
  console.log(id)

  function handlePayment(e){
    e.preventDefault();
    setLoading(true);

    axios
    .post(`http://18.140.1.124:8081/booking/${id}/payment`, {headers : {authorization:`bearer ${localStorage.getItem("token")}`}})
    .then(({data}) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Yeayyy..',
          text: `Selamat liburan!`
      })
    }
      console.log(data)
    })
    .catch((err) => {
      if (err) {
        Swal.fire({
          icon: 'error',
          title: 'Ooppss, Maaf..',
          text: `${err}`
      })
    }
  })
  .finally(() => {
    setLoading(false);
  });
}

  const [loading, setLoading] = useState(false);


  const data = {
    villaName: "Villa Premium A3",
    category: [
      "4-6 tamu",
      "Seluruh rumah",
      "4 kamar",
      "3 kamar mandi",
      "Wifi",
      "Dapur",
      "Parkir gratis",
    ],
    price: 4000000,
    nights: 2,
  };
  return (
    <>
      <Navbar />
      <div className="container mx-8 mb-16">
        <div className="flex items-center mt-16">
          <button className="md:text-4xl sm:text-3xl text-primary hover:text-elemen1" onClick={() => { router.push('/') }}>
            <HiChevronLeft />
          </button>
          <h1 className="md:text-4xl sm:text-3xl font-normal ml-3">
            Konfirmasi dan Bayar
          </h1>
        </div>

        <div className="flex flex-wrap">
          <div className="confirm-reserve lg:w-7/12 w-full">
            <div className="md:flex items-center mt-6">
              <Image alt="image" src="https://source.unsplash.com/random/300x200" width="300px" height="200px" />
              <div className="md:ml-6">
                <h1 className="text-4xl sm:mb-4">{data.villaName}</h1>
                <div className="detail">{`${data.category}, `}</div>
              </div>
            </div>

            <div className="flex justify-start text-xl mt-12">
              <DateRangePicker />
            </div>

            <h4 className="text-xl font-semibold mt-3">
              Rp. {data.price} x {data.nights} malam
            </h4>
            <h4 className="text-xl font-semibold mt-6">
              Total: Rp. {data.price * data.nights}
            </h4>
          </div>

          <div className="payment-form lg:w-5/12 w-full">
            <div className="mt-6">
              <form>
                <select
                  name="payMethod"
                  id="payMethod"
                  className="block border border-stone-600 rounded-lg px-3 py-2 text-xl"
                >
                  <option value="1">Gopay</option>
                  <option value="2">Kartu Kredit</option>
                </select>
                <div className="mt-10">
                  <label htmlFor="number">Masukkan No HP</label>
                  <input
                    type="text"
                    className="block border border-stone-600 p-2 rounded-lg"
                  />
                </div>
              </form>
              <button className="bg-primary px-4 py-3 text-white rounded-lg mt-6" onClick={handlePayment}>
                Konfirmasi dan Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
