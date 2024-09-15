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
import { toast } from "react-toastify";

import { Delete } from "../../utils/Icons";
import { useDeleteIncomeMutation } from "../../features/api/apiSlices/incomeApiSlice";
import { useDeleteExpenseMutation } from "../../features/api/apiSlices/expenseApiSlice";
import {
  closeModal,
  setRefetch,
} from "../../features/TransactionModals/deleteModal";
import { updateLoader } from "../../features/loader/loaderSlice";

const TransactionDeleteModal = () => {
  const data = useSelector((state) => state.deleteTransactionModal);
  const { isOpen, _id, title, type } = data;
  const dispatch = useDispatch();

  const mutationHook =
    type === "income" ? useDeleteIncomeMutation : useDeleteExpenseMutation;
  const [deleteTransaction, { isLoading }] = mutationHook();

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const res = await deleteTransaction(_id).unwrap();

      dispatch(updateLoader(60));
      await dispatch(setRefetch(true));
      await dispatch(closeModal());
      toast.success(
        res.message ||
          (type === "income"
            ? "Revenu supprimé avec succès !"
            : "Dépense supprimée avec succès !")
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur interne inattendue !");
    } finally {
      await dispatch(setRefetch(false));
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
            <h4 className="text-xl text-error tracking-relaxed">
              Êtes-vous sûr de vouloir supprimer {title} ?
            </h4>
          </ModalHeader>
          <ModalBody>
            <p className="text-sm">
              Confirmez la suppression : Cette action supprimera définitivement
              l'entrée de {type} sélectionnée. Une fois supprimée, elle ne peut
              pas être récupérée. Annulez pour conserver l'entrée de {type}.
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
              onClick={handleDelete}
              isLoading={isLoading}
              className="text-base"
              endContent={<Delete />}
            >
              Supprimer
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDeleteModal;
