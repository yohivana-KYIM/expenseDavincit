// import React, { useState, useEffect } from "react";
// import Chart from "../../components/Chart";
// import { useSelector } from "react-redux";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { NumericFormat } from "react-number-format";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// import { Income, Expense, Balance } from "../../utils/Icons";
// import { useGetAllIncomesQuery } from "../../features/api/apiSlices/incomeApiSlice";
// import { useGetAllExpensesQuery } from "../../features/api/apiSlices/expenseApiSlice";

// const DashboardPage = () => {
//   const user = useSelector((state) => state.auth.user.username);

//   const [totalBalance, setTotalBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [recentHistory, setRecentHistory] = useState([]);

//   const { data: incomeData, refetch: refetchIncomes } = useGetAllIncomesQuery();
//   const { data: expenseData, refetch: refetchExpenses } =
//     useGetAllExpensesQuery();

//   const fetchData = async () => {
//     try {
//       await refetchIncomes();
//       await refetchExpenses();
//       if (incomeData) {
//         setTotalIncome(incomeData?.totalIncome);
//       }
//       if (expenseData) {
//         setTotalExpense(expenseData?.totalExpense);
//       }
//       const totalBalance =
//         (incomeData?.totalIncome || 0) - (expenseData?.totalExpense || 0);
//       setTotalBalance(totalBalance);

//       const recentHistory = [
//         ...(incomeData?.incomes || []).map((transaction) => ({
//           ...transaction,
//           type: "income",
//         })),
//         ...(expenseData?.expenses || []).map((transaction) => ({
//           ...transaction,
//           type: "expense",
//         })),
//       ];
//       recentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
//       const recentTransactions = recentHistory.slice(0, 3);

//       setRecentHistory(recentTransactions);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.data?.error || "Unexpected Internal Server Error!");
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text(`Résumé du tableau de bord`, 14, 20);
//     doc.setFontSize(12);
//     doc.text(`Utilisateur: ${user}`, 14, 30);
//     doc.text(`Revenus totaux: FCFA ${totalIncome}`, 14, 40);
//     doc.text(`Dépenses totales: FCFA ${totalExpense}`, 14, 50);
//     doc.text(`Solde total: FCFA ${totalBalance}`, 14, 60);

//     // Transactions récentes
//     const transactionsTable = recentHistory.map((transaction) => [
//       transaction.title,
//       transaction.category,
//       transaction.amount,
//       transaction.type === "income" ? "Revenu" : "Dépense",
//       moment(transaction.date).format("MM/DD/YYYY"),
//     ]);

//     doc.autoTable({
//       head: [["Titre", "Catégorie", "Montant", "Type", "Date"]],
//       body: transactionsTable,
//       startY: 70,
//     });

//     // Save the PDF
//     doc.save(`dashboard_summary_${user}.pdf`);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [incomeData, expenseData]);

//   return (
//     <section className="w-full h-full md:h-[90vh] px-3 md:px-6">
//       <h2 className="mt-3 text-2xl text-center md:text-3xl lg:text-4xl sm:text-left text-pretty">
//         Bonjour, {user}😊
//       </h2>
//       <h3 className="text-sm text-center font-outfit md:text-base lg:text-lg sm:text-left text-pretty">
//         Voyez ce qui se passe avec votre argent, Gérons vos revenus/dépenses.{" "}
//         <span className="font-bold text-primary">
//           DavinciitSolutions-expenses!
//         </span>
//       </h3>

//       {/* Button to generate PDF */}
//       <button
//         onClick={generatePDF}
//         className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
//       >
//         Télécharger le résumé PDF
//       </button>

//       <div className="flex flex-col items-center justify-between w-full mt-8 sm:flex-row gap-y-4">
//         {/* Balances and other stats here... */}
//         <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
//           <div>
//             <h4 className="text-base font-outfit md:text-lg">Total Balance</h4>
//             <h4 className="mt-1 text-2xl md:text-3xl">
//               FCFA
//               <NumericFormat
//                 className="ml-1 text-xl md:text-2xl"
//                 value={totalBalance}
//                 displayType={"text"}
//                 thousandSeparator={true}
//               />
//             </h4>
//           </div>
//           <Balance className="icon" />
//         </div>
//         {/* Income and Expenses sections */}
//       </div>
//       {/* Recent Transactions and Chart */}
//     </section>
//   );
// };

// export default DashboardPage;













import React, { useState, useEffect } from "react";
import Chart from "../../components/Chart";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { Income, Expense, Balance } from "../../utils/Icons";
import { useGetAllIncomesQuery } from "../../features/api/apiSlices/incomeApiSlice";
import { useGetAllExpensesQuery } from "../../features/api/apiSlices/expenseApiSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DashboardPage = () => {
  const user = useSelector((state) => state.auth.user.username);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentHistory, setRecentHistory] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const { data: incomeData, refetch: refetchIncomes } = useGetAllIncomesQuery();
  const { data: expenseData, refetch: refetchExpenses } = useGetAllExpensesQuery();

  const fetchData = async () => {
    try {
      await refetchIncomes();
      await refetchExpenses();
      if (incomeData) {
        setTotalIncome(incomeData?.totalIncome);
      }
      if (expenseData) {
        setTotalExpense(expenseData?.totalExpense);
      }
      const totalBalance = (incomeData?.totalIncome || 0) - (expenseData?.totalExpense || 0);
      setTotalBalance(totalBalance);

      const recentHistory = [
        ...(incomeData?.incomes || []).map((transaction) => ({
          ...transaction,
          type: "income",
        })),
        ...(expenseData?.expenses || []).map((transaction) => ({
          ...transaction,
          type: "expense",
        })),
      ];
      recentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

      setRecentHistory(recentHistory);
      setFilteredTransactions(recentHistory);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Erreur Interne Inattendue  !");
    }
  };

  const filterTransactions = (option) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");
    const lastMonth = moment().subtract(1, "months").startOf("month");

    let filtered = [];

    if (option === "today") {
      filtered = recentHistory.filter((transaction) =>
        moment(transaction.date).isSame(today, "day")
      );
    } else if (option === "yesterday") {
      filtered = recentHistory.filter((transaction) =>
        moment(transaction.date).isSame(yesterday, "day")
      );
    } else if (option === "lastMonth") {
      filtered = recentHistory.filter((transaction) =>
        moment(transaction.date).isBetween(lastMonth, today)
      );
    } else {
      filtered = recentHistory;
    }

    setFilteredTransactions(filtered);
  };

  const handleFilterChange = (e) => {
    const option = e.target.value;
    setFilterOption(option);
    filterTransactions(option);
  };

  const incomeDates = incomeData?.incomes.map((income) =>
    moment(income.date).format("MM/DD/YYYY")
  ) || [];
  const incomeAmounts = incomeData?.incomes.map((income) => income.amount) || [];
  const expenseAmounts = expenseData?.expenses.map((expense) => expense.amount) || [];

  let data = [];

  if (incomeAmounts.length === 0 || expenseAmounts.length === 0) {
    data = [
      {
        name: "Données non disponibles. Veuillez ajouter vos revenus/dépenses pour afficher ce tableau..",
        income: 0,
        expense: 0,
      },
    ];
  } else {
    data = incomeDates.map((date, index) => ({
      name: date,
      income: incomeAmounts[index] || 0,
      expense: expenseAmounts[index] || 0,
    }));
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Résumé du tableau de bord`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Utilisateur: ${user}`, 14, 30);
    doc.text(`Revenus totaux: FCFA ${totalIncome}`, 14, 40);
    doc.text(`Dépenses totales: FCFA ${totalExpense}`, 14, 50);
    doc.text(`Solde total: FCFA ${totalBalance}`, 14, 60);

    const transactionsTable = filteredTransactions.map((transaction) => [
      transaction.title,
      transaction.category,
      transaction.amount,
      transaction.type === "income" ? "Revenu" : "Dépense",
      moment(transaction.date).format("MM/DD/YYYY"),
    ]);

    doc.autoTable({
      head: [["Titre", "Catégorie", "Montant", "Type", "Date"]],
      body: transactionsTable,
      startY: 70,
    });

    doc.save(`résumé_tableau_de_bord_${user}.pdf`);
  };

  useEffect(() => {
    fetchData();
  }, [incomeData, expenseData]);

  return (
    <section className="w-full h-full md:h-[90vh] px-3 md:px-6">
      <h2 className="mt-3 text-2xl text-center md:text-3xl lg:text-4xl sm:text-left text-pretty">
        Bonjour, {user}😊
      </h2>
      <h3 className="text-sm text-center font-outfit md:text-base lg:text-lg sm:text-left text-pretty">
        Voyez ce qui se passe avec votre argent, Gérons vos revenus/dépenses.{" "}
        <span className="font-bold text-primary">
          Da vinci it Solutions-expenses!
        </span>
      </h3>

      <button
        onClick={generatePDF}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
      >
        Télécharger le résumé PDF
      </button>

      <div className="flex flex-col items-center justify-between w-full mt-8 sm:flex-row gap-y-4">
        {/* Total Balance */}
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="text-base font-outfit md:text-lg">Solde</h4>
            <h4 className="mt-1 text-2xl md:text-3xl">
              FCFA
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalBalance}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Balance className="icon" />
        </div>

        {/* Total Incomes */}
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="text-base font-outfit md:text-lg">Total Revenu</h4>
            <h4 className="mt-1 text-2xl md:text-3xl text-emerald-400">
              FCFA
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalIncome}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Income className="icon text-emerald-400" />
        </div>

        {/* Total Expenses */}
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="text-base font-outfit md:text-lg">Total Depenses</h4>
            <h4 className="mt-1 text-2xl text-red-400 md:text-3xl">
              FCFA
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalExpense}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Expense className="text-red-400 icon" />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="flex flex-col w-full gap-4 mt-8 md:flex-row">
        <div className="w-full md:w-[35%]">
          <h4 className="text-lg font-outfit md:text-xl text-pretty">
            Transactions Récentes
          </h4>
          <div className="mt-2">
            <select
              value={filterOption}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="all">Tous</option>
              <option value="today">Aujourd'hui</option>
              <option value="yesterday">Hier</option>
              <option value="lastMonth">Le Mois Dernier</option>
            </select>
          </div>

          <div className="space-y-2">
            {filteredTransactions.slice(0, 3).map((transaction, index) => (
              <div
                key={index}
                className={`p-4 flex items-center justify-between rounded-lg ${
                  transaction.type === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div>
                  <p className="font-semibold">
                    {transaction.type === "income" ? "📈" : "📉"} {transaction.title} - FCFA{" "}
                    <NumericFormat
                      value={transaction.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      className={`${
                        transaction.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    />
                  </p>
                  <p className="text-sm text-gray-500">
                    {moment(transaction.date).format("MM/DD/YYYY")} -{" "}
                    {transaction.type === "income" ? "Revenu" : "Dépense"}
                  </p>
                </div>

                <div className="text-2xl">
                  {transaction.type === "income" ? (
                    <Income className="text-green-500" />
                  ) : (
                    <Expense className="text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graph */}
        <div className="w-full mt-4 md:mt-0 md:w-[65%]">
          <Chart data={data} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;








