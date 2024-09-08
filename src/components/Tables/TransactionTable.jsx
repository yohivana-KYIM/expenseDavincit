// import React from "react";
// import moment from "moment";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Tooltip,
//   Pagination,
//   Chip,
//   Spinner,
// } from "@nextui-org/react";
// import { useDispatch } from "react-redux";
// import { openModal as deleteModal } from "../../features/TransactionModals/deleteModal";
// import { openModal as viewAndUpdateModal } from "../../features/TransactionModals/viewAndUpdateModal";
// import { EyeOutline as Eye, Edit, Delete } from "../../utils/Icons";

// const TransactionTable = ({
//   data,
//   name,
//   isLoading,
//   setCurrentPage,
//   totalPages,
//   currentPage,
//   chipColorMap,
// }) => {
//   const dispatch = useDispatch();
//   return (
//     <div className="w-full h-full flex justify-center">
//       <Table
//         aria-label="Transactions table"
//         bottomContent={
//           totalPages > 1 ? (
//             <div className="flex w-full justify-center">
//               <Pagination
//                 isCompact
//                 showControls
//                 showShadow
//                 color="primary"
//                 page={currentPage}
//                 total={totalPages}
//                 onChange={(page) => setCurrentPage(page)}
//               />
//             </div>
//           ) : null
//         }
//         classNames={{
//           base: "pb-12",
//           wrapper: "h-full px-8 box-shadow-second",
//           table: !data ? "h-full" : "",
//         }}
//       >
//         <TableHeader>
//           <TableColumn key={name} className="capitalize">
//             {name}
//           </TableColumn>
//           <TableColumn key="amount">Amount</TableColumn>
//           <TableColumn key="category">Category</TableColumn>
//           <TableColumn key="description">Description</TableColumn>
//           <TableColumn key="date">Date</TableColumn>
//           <TableColumn key="actions">Actions</TableColumn>
//         </TableHeader>
//         <TableBody
//           items={data || []}
//           loadingContent={<Spinner color="primary" size="lg" />}
//           loadingState={isLoading ? "loading" : "idle"}
//           emptyContent={
//             !data && !isLoading
//               ? `No ${name}s to display. Please add some ${name}s!`
//               : ""
//           }
//         >
//           {data?.map(({ title, amount, category, description, date, _id }) => (
//             <TableRow key={_id}>
//               <TableCell className="text-primary font-calSans tracking-wider capitalize">
//                 {title}
//               </TableCell>
//               <TableCell> FCFA{amount}</TableCell>
//               <TableCell>
//                 <Chip
//                   className="capitalize"
//                   color={chipColorMap[category]}
//                   size="sm"
//                   variant="flat"
//                 >
//                   {category}
//                 </Chip>
//               </TableCell>
//               <TableCell
//                 className={`transition-all ${
//                   description.length > 20
//                     ? " hover:text-gray-400 hover:cursor-pointer"
//                     : ""
//                 }`}
//                 onClick={() => {
//                   if (description.length > 20) {
//                     dispatch(
//                       viewAndUpdateModal({
//                         transaction: {
//                           title,
//                           amount,
//                           category,
//                           description,
//                           date,
//                         },
//                         _id,
//                         type: name,
//                         isDisabled: true,
//                       })
//                     );
//                   }
//                 }}
//               >
//                 {description.length > 20
//                   ? `${description.slice(0, 20)}...`
//                   : description}
//               </TableCell>
//               <TableCell>{moment(date).format("YYYY-MM-DD")}</TableCell>
//               <TableCell className="relative flex items-center gap-2">
//                 <Tooltip content="View More">
//                   <span
//                     className="text-lg text-default-400 cursor-pointer active:opacity-50"
//                     onClick={() =>
//                       dispatch(
//                         viewAndUpdateModal({
//                           transaction: {
//                             title,
//                             amount,
//                             category,
//                             description,
//                             date,
//                           },
//                           _id,
//                           type: name,
//                           isDisabled: true,
//                         })
//                       )
//                     }
//                   >
//                     <Eye />
//                   </span>
//                 </Tooltip>
//                 <Tooltip content="Edit">
//                   <span
//                     className="text-lg text-default-400 cursor-pointer active:opacity-50"
//                     onClick={() =>
//                       dispatch(
//                         viewAndUpdateModal({
//                           transaction: {
//                             _id,
//                             title,
//                             amount,
//                             category,
//                             description,
//                             date,
//                           },
//                           _id,
//                           type: name,
//                         })
//                       )
//                     }
//                   >
//                     <Edit />
//                   </span>
//                 </Tooltip>
//                 <Tooltip color="danger" content="Delete">
//                   <span
//                     className="text-lg text-danger cursor-pointer active:opacity-50"
//                     onClick={() =>
//                       dispatch(deleteModal({ title, _id, type: name }))
//                     }
//                   >
//                     <Delete />
//                   </span>
//                 </Tooltip>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default TransactionTable;





import React from "react";
import moment from "moment";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Chip,
  Spinner,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { openModal as deleteModal } from "../../features/TransactionModals/deleteModal";
import { openModal as viewAndUpdateModal } from "../../features/TransactionModals/viewAndUpdateModal";
import { EyeOutline as Eye, Edit, Delete, Download } from "../../utils/Icons"; // Ajoutez un icône "Download" pour le téléchargement
import * as XLSX from 'xlsx'; // Importez la bibliothèque XLSX

const TransactionTable = ({
  data,
  name,
  isLoading,
  setCurrentPage,
  totalPages,
  currentPage,
  chipColorMap,
}) => {
  const dispatch = useDispatch();

  // Fonction pour exporter les données en CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `${name}-transactions.csv`);
  };

  // Fonction pour exporter les données en Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `${name}-transactions.xlsx`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-end mb-4 space-x-2">
        {/* Bouton d'export CSV */}
        <Tooltip content="Exporter en CSV">
          <button
            onClick={exportToCSV}
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
          >
            <Download /> Export CSV
          </button>
        </Tooltip>

        {/* Bouton d'export Excel */}
        <Tooltip content="Exporter en Excel">
          <button
            onClick={exportToExcel}
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
          >
            <Download /> Export Excel
          </button>
        </Tooltip>
      </div>

      <Table
        aria-label="Transactions table"
        bottomContent={
          totalPages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={currentPage}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{
          base: "pb-12",
          wrapper: "h-full px-8 box-shadow-second",
          table: !data ? "h-full" : "",
        }}
      >
        <TableHeader>
          <TableColumn key={name} className="capitalize">
            {name}
          </TableColumn>
          <TableColumn key="amount">Amount</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="description">Description</TableColumn>
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={data || []}
          loadingContent={<Spinner color="primary" size="lg" />}
          loadingState={isLoading ? "loading" : "idle"}
          emptyContent={
            !data && !isLoading
              ? `No ${name}s to display. Please add some ${name}s!`
              : ""
          }
        >
          {data?.map(({ title, amount, category, description, date, _id }) => (
            <TableRow key={_id}>
              <TableCell className="text-primary font-calSans tracking-wider capitalize">
                {title}
              </TableCell>
              <TableCell> FCFA{amount}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={chipColorMap[category]}
                  size="sm"
                  variant="flat"
                >
                  {category}
                </Chip>
              </TableCell>
              <TableCell
                className={`transition-all ${
                  description.length > 20
                    ? " hover:text-gray-400 hover:cursor-pointer"
                    : ""
                }`}
                onClick={() => {
                  if (description.length > 20) {
                    dispatch(
                      viewAndUpdateModal({
                        transaction: {
                          title,
                          amount,
                          category,
                          description,
                          date,
                        },
                        _id,
                        type: name,
                        isDisabled: true,
                      })
                    );
                  }
                }}
              >
                {description.length > 20
                  ? `${description.slice(0, 20)}...`
                  : description}
              </TableCell>
              <TableCell>{moment(date).format("YYYY-MM-DD")}</TableCell>
              <TableCell className="relative flex items-center gap-2">
                <Tooltip content="View More">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() =>
                      dispatch(
                        viewAndUpdateModal({
                          transaction: {
                            title,
                            amount,
                            category,
                            description,
                            date,
                          },
                          _id,
                          type: name,
                          isDisabled: true,
                        })
                      )
                    }
                  >
                    <Eye />
                  </span>
                </Tooltip>
                <Tooltip content="Edit">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() =>
                      dispatch(
                        viewAndUpdateModal({
                          transaction: {
                            _id,
                            title,
                            amount,
                            category,
                            description,
                            date,
                          },
                          _id,
                          type: name,
                        })
                      )
                    }
                  >
                    <Edit />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() =>
                      dispatch(deleteModal({ title, _id, type: name }))
                    }
                  >
                    <Delete />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;

