import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useLogoutMutation } from "../../features/api/apiSlices/userApiSlice";
import { closeModal } from "../../features/logoutModal/logoutModalSlice";
import { resetCredentials } from "../../features/authenticate/authSlice";
import { updateLoader } from "../../features/loader/loaderSlice";
import { Logout } from "../../utils/Icons";

const LogoutModal = () => {
  const isOpen = useSelector((state) => state.logoutModal.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const res = await logout().unwrap();
      await dispatch(resetCredentials());

      dispatch(updateLoader(60));
      await dispatch(closeModal());
      toast.success(res.message || "Déconnexion réussie !");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur interne inattendue !");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <>
          <ModalHeader>
            <h4 className="text-2xl text-error tracking-relaxed">
              Confirmation de Déconnexion ?
            </h4>
          </ModalHeader>
          <ModalBody>
            <p>
              Êtes-vous sûr de vouloir vous déconnecter ? La déconnexion mettra fin à votre session actuelle et vous devrez vous reconnecter pour accéder à votre compte.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => dispatch(closeModal())}
              className="text-base"
            >
              Annuler
            </Button>
            <Button
              color="primary"
              onClick={handleLogout}
              endContent={<Logout />}
              isLoading={isLoading}
              className="text-base"
            >
              Se Déconnecter
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
