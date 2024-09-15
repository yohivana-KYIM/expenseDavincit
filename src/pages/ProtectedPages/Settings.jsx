import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import {
  Tabs,
  Tab,
  Link,
  Button,
  Card,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authenticate/authSlice";
import { updateLoader } from "../../features/loader/loaderSlice";

import { UpdateProfile, ResetPassword } from "../../utils/Icons";

import {
  UsernameInput,
  PasswordInput,
  EmailInput,
} from "../../components/Inputs";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
} from "../../features/api/apiSlices/userApiSlice";
import validateForm from "../../utils/validateForm";

const Settings = () => {
  const [selected, setSelected] = useState("acountInfo");
  const [accountInfoData, setAccountInfoData] = useState({
    username: "",
    email: "",
  });
  const [resetPassData, setResetPassData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [accountInfoErrors, setAccountInfoErrors] = useState({});
  const [resetPassErrors, setResetPassErrors] = useState({});

  const [initialAccountInfoData, setInitialAccountInfoData] = useState({
    username: "",
    email: "",
  });

  const validationAccountInfoSchema = object({
    username: string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères.")
      .max(20, "Le nom d'utilisateur ne doit pas dépasser 20 caractères."),
    email: string().email("Email invalide."),
  });
  const validationResetPassSchema = object({
    oldPassword: string()
      .required("Le mot de passe est requis.")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    newPassword: string()
      .required("Le nouveau mot de passe est requis.")
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères."),
  });

  const handleAccountInfoOnChange = (e) => {
    setAccountInfoData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateForm(
      e.target.name,
      e.target.value,
      validationAccountInfoSchema,
      setAccountInfoErrors
    );
  };
  const handleResetPasswordOnChange = (e) => {
    setResetPassData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateForm(
      e.target.name,
      e.target.value,
      validationResetPassSchema,
      setResetPassErrors
    );
  };

  const { username, email } = accountInfoData;
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserDetailsMutation();
  const dispatch = useDispatch();

  const handleUpdateUser = async (e) => {
    try {
      e.preventDefault();

      if (
        username === initialAccountInfoData.username &&
        email === initialAccountInfoData.email
      ) {
        toast.error("Aucun changement détecté.");
        return;
      }

      dispatch(updateLoader(40));
      const res = await updateUser(accountInfoData).unwrap();
      await dispatch(setCredentials(res.user));

      dispatch(updateLoader(60));
      toast.success(res.message || "Profil mis à jour avec succès !");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur interne inattendue !");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const { oldPassword, newPassword } = resetPassData;
  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();
  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const res = await resetPassword(resetPassData).unwrap();

      dispatch(updateLoader(60));
      toast.success(res.message || "Mot de passe mis à jour avec succès !");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur interne inattendue !");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const {
    data,
    isLoading: userDetailsLoading,
    refetch,
  } = useGetUserDetailsQuery();
  const getUserDetails = async () => {
    try {
      await refetch();
      if (data?.user) {
        setAccountInfoData((prev) => ({
          ...prev,
          username: data.user.username,
        }));
        setAccountInfoData((prev) => ({ ...prev, email: data.user.email }));
        setInitialAccountInfoData({
          username: data.user.username,
          email: data.user.email,
        });
      }
    } catch (error) {
      console.log(error);
      await toast.error(
        error?.data?.error ||
          "Une erreur inattendue s'est produite lors de la récupération des données !"
      );
    }
  };

  const hasAccountInfoErrors = Object.values(accountInfoErrors).some(
    (error) => !!error
  );
  const hasResetPassErrors = Object.values(resetPassErrors).some(
    (error) => !!error
  );

  useEffect(() => {
    getUserDetails();
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[90vh] space-y-8">
      <h4 className="mt-4 text-2xl text-center md:text-3xl lg:text-5xl">
        Paramètres du Compte
      </h4>
      <Card className="w-[20rem] md:w-[30rem] h-[25rem]">
        {userDetailsLoading ? (
          <Spinner />
        ) : (
          <CardBody className="flex flex-col justify-center overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
              className="mb-4"
            >
              <Tab key="accountInfo" title="Informations du Compte">
                <form className="flex flex-col gap-4">
                  <UsernameInput
                    value={username}
                    onChange={handleAccountInfoOnChange}
                    errors={accountInfoErrors}
                  />
                  <EmailInput
                    value={email}
                    onChange={handleAccountInfoOnChange}
                    errors={accountInfoErrors}
                    noDescription
                  />
                  <p className="text-center text-pretty text-small">
                    Besoin de mettre à jour votre mot de passe ?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("resetPassword")}
                      className="cursor-pointer"
                    >
                      Réinitialiser le mot de passe
                    </Link>
                  </p>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={handleUpdateUser}
                    isDisabled={hasAccountInfoErrors}
                    isLoading={updateUserLoading}
                    endContent={<UpdateProfile />}
                  >
                    Mettre à jour le Profil
                  </Button>
                </form>
              </Tab>
              <Tab key="resetPassword" title="Réinitialiser le Mot de Passe">
                <form className="flex flex-col gap-4">
                  <PasswordInput
                    name="oldPassword"
                    label="Ancien Mot de Passe"
                    placeholder="Entrez l'Ancien Mot de Passe"
                    value={oldPassword}
                    onChange={handleResetPasswordOnChange}
                    isInvalid={!!resetPassErrors?.oldPassword}
                    errorMessage={resetPassErrors?.oldPassword}
                  />
                  <PasswordInput
                    name="newPassword"
                    label="Nouveau Mot de Passe"
                    placeholder="Entrez le Nouveau Mot de Passe"
                    value={newPassword}
                    onChange={handleResetPasswordOnChange}
                    isInvalid={!!resetPassErrors?.newPassword}
                    errorMessage={resetPassErrors?.newPassword}
                  />
                  <p className="text-center text-small">
                    Vous voulez modifier les détails de votre compte ?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("accountInfo")}
                      className="cursor-pointer"
                    >
                      Informations du Compte
                    </Link>
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      fullWidth
                      color="primary"
                      isLoading={resetPasswordLoading}
                      onClick={handleResetPassword}
                      isDisabled={
                        !oldPassword || !newPassword || hasResetPassErrors
                      }
                      endContent={<ResetPassword />}
                    >
                      Réinitialiser le Mot de Passe
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        )}
      </Card>
    </div>
  );
};

export default Settings;
