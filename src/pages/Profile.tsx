import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IAuthResponse } from "../types/response";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";

import profileImg from "../assets/images/profile-img.webp";
import phoneIcon from "../assets/images/phone-icon.svg";
import nameIcon from "../assets/images/form-icon.svg";
import addressIcon from "../assets/images/address-icon.svg";
import emailIcon from "../assets/images/email-icon.svg";
// import passwordIcon from "../assets/images/password-icon.svg";
import useAuth from "../components/UseAuth";
import ChangePassword from "../components/ChangePassword";

export function Profiles() {
  return (
    <>
      <Header />
      <Profile />
      <Footer />
    </>
  );
}

function Profile() {
  const [form, setForm] = useState<{ full_name?: string; email?: string; phone?: string; address?: string }>({ full_name: "", email: "", phone: "", address: "" });
  const { token } = useAuth();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "https://coffee-shop-three-omega.vercel.app/user/settings";
    console.log("Token:", token);
    axios
      .patch(url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result: AxiosResponse<IAuthResponse>) => console.log(result.data))
      .catch((err) => console.error(err));
  };
  return (
    <main className="font-jakarta mt-[20%] tbt:mt-[10%] lg:mt-[7%] px-[5%] tbt:px-[10%]">
      <h1 className="text-4xl mb-4">Profile</h1>
      <section className="block tbt:flex">
        <div className="border border-solid border-darkgray2 p-2 tbt:h-1/2 tbt:mr-4 tbt:w-1/2 md:w-2/5 lg:w-1/4 2xl:w-1/5">
          <p className="text-center text-sm uw:text-xl">Ghaluh Wizard</p>
          <p className="text-center text-sm uw:text-xl mb-2">ghaluhwizz@gmail.com</p>
          <div className="grid place-items-center mb-2">
            <img width="100" height="100" src={profileImg} alt="profile-img" />
          </div>
          <div className="flex justify-center items-center">
            <button className="mb-2 text-lightblack text-sm uw:text-xl bg-primary hover:bg-darkprimary active:bg-darkprimary2 rounded-lg w-1/2 tbt:w-3/4 h-11 uw:h-16">Upload New Photo</button>
          </div>
          <p className="text-center text-sm uw:text-xl">Since 20 January 2024</p>
        </div>
        <div className="w-full mt-4 tbt:mt-0 border border-solid border-darkgray2 p-2">
          <form onSubmit={onSubmitHandler}>
            <label className="text-lightblack2 font-semibold md:text-xl uw:text-2xl" htmlFor="full_name">
              Full Name
            </label>
            <div className="relative mt-2">
              <img className="absolute mt-4 ml-5" width="20" height="20" src={nameIcon} alt="name-icon" />
              <Input input={{ type: "text", name: "full_name", placeholder: "Enter Your Full Name", autocomplete: "name", value: form.full_name, onChange: onChangeHandler }} />
            </div>
            <label className="text-lightblack2 font-semibold md:text-xl uw:text-2xl" htmlFor="email">
              Email
            </label>
            <div className="relative mt-2">
              <img className="absolute mt-4 ml-5" width="20" height="20" src={emailIcon} alt="email-icon" />
              <Input input={{ type: "text", name: "email", placeholder: "Enter your email", autocomplete: "email", value: form.email, onChange: onChangeHandler }} />
            </div>
            <label className="text-lightblack2 font-semibold md:text-xl uw:text-2xl" htmlFor="phone">
              Phone
            </label>
            <div className="relative mt-2">
              <img className="absolute mt-4 ml-5" width="20" height="20" src={phoneIcon} alt="phone-icon" />
              <Input input={{ type: "text", name: "phone", placeholder: "Enter Your Phone", autocomplete: "off", value: form.phone, onChange: onChangeHandler }} />
            </div>
            {/* <div className="flex justify-between">
            <label className="text-lightblack2 font-semibold md:text-xl uw:text-2xl" htmlFor="password">
              Password
            </label>
            <p className="text-sm text-right text-primary">Set New Password</p>
          </div>
          <div className="relative mt-2">
            <img className="absolute mt-4 ml-5" width="20" height="20" src={passwordIcon} alt="password-icon" />
            <input
              className="w-full h-12 border border-solid border-darkwhite rounded-xl pt-0.5 pl-14 text-lightgray mb-3 text-xs md:text-sm uw:text-xl"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              autoComplete="off"
            />
          </div> */}
            <label className="text-lightblack2 font-semibold md:text-xl uw:text-2xl" htmlFor="address">
              Address
            </label>
            <div className="relative mt-2">
              <img className="absolute mt-4 ml-5" width="20" height="20" src={addressIcon} alt="address-icon" />
              <Input input={{ type: "text", name: "address", placeholder: "Enter Your Address", autocomplete: "off", value: form.address, onChange: onChangeHandler }} />
            </div>
            <button className="text-lightblack mb-5 text-lg uw:text-2xl bg-primary hover:bg-darkprimary active:bg-darkprimary2 rounded-lg w-full h-11 uw:h-16" type="submit">
              Submit
            </button>
          </form>
          <ChangePassword />
        </div>
      </section>
    </main>
  );
}

export default Profile;
