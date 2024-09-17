import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Suggestion = () => {
  const [income, setIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [name, setName] = useState('');

  const calculateSuggestion = () => {
    const incomeNum = parseFloat(income);
    const expensesNum = parseFloat(monthlyExpenses);

    if (isNaN(incomeNum) || isNaN(expensesNum) || incomeNum <= 0 || expensesNum <= 0) {
      toast.error('Veuillez entrer des montants valides pour les revenus et les dépenses. Les valeurs doivent être supérieures à zéro.');
      return;
    }

    const targetSavingsPercentage = 0.30;
    const targetSavings = incomeNum * targetSavingsPercentage;
    const fixedExpensesPercentage = 0.20;
    const fixedExpenses = incomeNum * fixedExpensesPercentage;
    const currentSavings = incomeNum - expensesNum;
    const amountToCut = targetSavings - currentSavings;

    let message = '';

    if (expensesNum <= fixedExpenses) {
      message = `Bravo ${name ? name : 'Cher utilisateur'} ! Vous maintenez vos dépenses dans la limite des charges fixes recommandées. Voici quelques conseils pour mieux gérer vos finances :`;
      message += `\n- Pour atteindre votre objectif d'épargne de ${targetSavings.toFixed(2)}, essayez de réduire vos dépenses actuelles de ${amountToCut.toFixed(2)}.`;
      message += `\n- Vous avez actuellement des dépenses de ${expensesNum.toFixed(2)}. Évaluez ces dépenses pour identifier les domaines où vous pouvez économiser.`;
    } else if (amountToCut > 0) {
      message = `Pour atteindre votre objectif d'épargne de ${targetSavings.toFixed(2)}, vous devriez réduire vos dépenses de ${amountToCut.toFixed(2)}. Voici des suggestions :`;
      message += `\n- Vos dépenses actuelles dépassent la limite des charges fixes recommandées. Essayez de réduire les dépenses dans les domaines non essentiels.`;
      message += `\n- Vous avez mentionné les dépenses suivantes : ${expenseDescription}. Examinez ces dépenses et cherchez des opportunités pour les réduire ou les optimiser.`;
      message += `\n- Par exemple, si une dépense importante est pour des loisirs ou des abonnements, évaluez si ces dépenses sont nécessaires ou si elles peuvent être réduites.`;
    } else {
      message = `Vous dépensez plus que ce que vous gagnez. Voici quelques conseils pour éviter des difficultés financières :`;
      message += `\n- Réduisez vos dépenses globales pour éviter de dépenser plus que vos revenus. Faites un budget détaillé et respectez-le.`;
      message += `\n- Évitez les achats impulsifs et concentrez-vous sur les dépenses essentielles.`;
    }

    toast.info(message);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Suggestions d'Épargne</h1>
      
      <div className="mb-4">
        <label className="block text-gray-600 mb-2" htmlFor="name">Votre Nom</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Entrez votre nom"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2" htmlFor="income">Revenus Mensuels</label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Entrez vos revenus mensuels"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2" htmlFor="monthlyExpenses">Dépenses Mensuelles</label>
        <input
          type="number"
          id="monthlyExpenses"
          value={monthlyExpenses}
          onChange={(e) => setMonthlyExpenses(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Entrez vos dépenses mensuelles"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2" htmlFor="expenseDescription">Description des Dépenses</label>
        <textarea
          id="expenseDescription"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Décrivez vos dépenses"
          rows="3"
        />
      </div>

      <button
        onClick={calculateSuggestion}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Obtenir des Suggestions
      </button>

      {/* Affichage du conteneur Toast */}
      <ToastContainer />
    </div>
  );
};

export default Suggestion;
