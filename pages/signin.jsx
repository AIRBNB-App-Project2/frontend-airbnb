import React, { useState } from 'react'
import Image from 'next/image'
import villoka from '../img/Villoka.svg'
import Elemt1 from '../img/img-signin.png'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import Loading from '../components/loading'


function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState({})
    const [passwordErr, setPasswordErr] = useState({})
    const [loading, setLoading] = useState(false)

    const router = useRouter();


    // Toggle Sign In 
    function handleSubmit(e) {
        e.preventDefault();
        const isValid = formValidation();
        if (isValid) {
            const data = { email, password };
            setLoading(true)
            axios
                .post("http://18.140.1.124:8081/login", data)
                .then(({ data }) => {
                    // console.log(data.data);
                    if (data) {
                        setEmail("");
                        setPassword("");
                        Toast.fire({
                            icon: 'success',
                            title: 'Selamat Datang di Villoka'
                        })
                        localStorage.setItem('token', data.data.token)
                        router.push("/")
                    }
                })
                .catch((err) => {
                    // console.log(err.response.data.message);
                    setEmail("");
                    setPassword("");
                    if (err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ooppss,Maaf..',
                            text: 'Data Tidak Ditemukan'
                        })
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    // Function Validation
    const formValidation = () => {
        const emailErr = {};
        const passwordErr = {};
        let isValid = true;

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            emailErr.mailtag = "Invalid Email";
            isValid = false;
        }
        if (password.length <= 8) {
            passwordErr.passleng = "Password must be at least 8 chars long";
            isValid = false;
        }

        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        setTimeout(() => {
            setEmailErr('');
            setPasswordErr('');
        }, 2000);
        return isValid;
    };

    // Notif Success
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    if (loading) {
        return (
            <Loading />
        );
    }
    return (
        <>
            <section className="min-h-screen flex items-stretch ">
                <div className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center text-white ">
                    <div className="w-full px-24 z-10 ">
                        <Image src={Elemt1} alt="Villoka Logo" />
                    </div>
                </div>
                <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
                    <div className="w-full py-3 z-20">
                        <div className='flex items-center justify-center mb-5'>
                            <Image src={villoka} alt="Villoka Logo" />
                        </div>
                        <form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                            <div className="pb-2 pt-4">
                                <input type="email" placeholder="Email" className="block w-full p-4 text-lg text-white rounded-lg bg-secondary placeholder:italic placeholder:text-slate-400" autoComplete='off' onChange={e => { setEmail(e.target.value) }} value={email} />
                                {Object.keys(emailErr).map((key) => {
                                    return <div className='text-red-500 text-md text-left italic p-2'>{emailErr[key]}</div>
                                })}
                            </div>
                            <div className="pb-2 pt-4">
                                <input className="block w-full p-4 text-lg rounded-lg text-white bg-secondary placeholder:italic placeholder:text-slate-400" type="password" placeholder="Password" autoComplete='off' onChange={e => { setPassword(e.target.value) }} value={password} />
                                {Object.keys(passwordErr).map((key) => {
                                    return <div className='text-red-500 text-md text-left italic p-2'>{passwordErr[key]}</div>
                                })}
                            </div>

                            <div className="px-4 pb-2 pt-4 mt-6">
                                <button className="uppercase block px-10 py-4 mx-auto text-lg text-white font-semibold rounded-md bg-secondary hover:bg-white hover:text-secondary hover:ring-1 hover:ring-secondary active:drop-shadow-sm focus:outline-none" onClick={handleSubmit} >Masuk </button>
                            </div>
                            <small className='mt-5 italic text-elemen1'>Belum punya akun?<span className='hover:text-secondary text-lg'><Link href={'/signup'}> Daftar &rarr;</Link></span></small>

                            {/* Media Social */}
                            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                                <a href="#">
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                </a>
                                <a href="#">
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </a>
                                <a href="#">
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn