import React, { useState, useEffect } from "react";
import { object, string } from "yup";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../features/api/apiSlices/userApiSlice";
import { setCredentials } from "../features/authenticate/authSlice";
import { updateLoader } from "../features/loader/loaderSlice";

import registerImg from "../assets/register.webp";
import { UserAuthForm, OtpForm } from "../components/Forms";
import validateForm from "../utils/validateForm";
import { UsernameInput, EmailInput, PasswordInput } from "../components/Inputs";
import SubmitButton from "../components/SubmitButton";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(
    parseInt(localStorage.getItem("otpCountdown")) || 0
  );

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 : enregistrement, 2 : vérification OTP

  const validationSchema = object({
    username: string()
      .required("Le nom d'utilisateur est requis.")
      .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères.")
      .max(20, "Le nom d'utilisateur ne doit pas dépasser 20 caractères."),
    email: string().required("L'email est requis.").email("Email invalide."),
    password: string()
      .required("Le mot de passe est requis.")
      .min(8, "Le mot de passe doit comporter au moins 8 caractères."),
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateForm(e.target.name, e.target.value, validationSchema, setErrors);
  };

  const { username, email, password } = formData;
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const res = await register(formData).unwrap();
      await dispatch(setCredentials(res.user));
      await sendOtp({ email });
      setCountdown(60);
      await localStorage.setItem("otpCountdown", "60");

      dispatch(updateLoader(60));
      toast.success("OTP envoyé avec succès. Veuillez vérifier votre email !");

      setStep(2);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur interne inattendue !");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();

  const handleOtpSubmit = async (e) => {
    try {
      e.preventDefault();

      await dispatch(updateLoader(40));
      const otpRes = await verifyOtp({ email, otp }).unwrap();

      await dispatch(updateLoader(60));
      await dispatch(setCredentials(otpRes.user));
      toast.success(otpRes.message || "L'email a été vérifié avec succès !");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur interne inattendue !");
    } finally {
      dispatch(updateLoader(100));
    }
  };
  const resendOtp = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const otpRes = await sendOtp({ email }).unwrap();

      dispatch(updateLoader(70));
      toast.success(
        otpRes.message || "OTP envoyé avec succès. Veuillez vérifier votre email !"
      );
      setCountdown(60);
      localStorage.setItem("otpCountdown", "60");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur interne inattendue !");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const hasErrors = Object.values(errors).some((error) => !!error);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        localStorage.setItem("otpCountdown", (countdown - 1).toString());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <section className="w-full h-[90vh] px-6 sm:px-8 md:px-12 flex justify-center items-center">
      <UserAuthForm
        title={step === 1 ? "" : "Vérifiez votre email"}
        imageTitle="Facile à utiliser."
        imageSrc={registerImg}
        alt="image d'enregistrement"
        form={
          step === 1 ? (
            <>
              <UsernameInput
                value={username}
                onChange={handleOnChange}
                errors={errors}
              />
              <EmailInput
                value={email}
                onChange={handleOnChange}
                errors={errors}
              />
              <PasswordInput
                value={password}
                onChange={handleOnChange}
                errors={errors}
              />
              <SubmitButton
                isLoading={registerLoading}
                handleSubmit={handleSubmit}
                isDisabled={!email || !password || !username || hasErrors}
              />
            </>
          ) : (
            <OtpForm
              otp={otp}
              setOtp={setOtp}
              email={email}
              handleOtpSubmit={handleOtpSubmit}
              resendOtp={resendOtp}
              countdown={countdown}
              verifyOtpLoading={verifyOtpLoading}
            />
          )
        }
        footer={step === 1 && "Vous avez déjà un compte ?"}
        footerLink={step === 1 && "Connexion"}
        footerLinkPath={step === 1 && "/login"}
      />
    </section>
  );
};

export default Register;
