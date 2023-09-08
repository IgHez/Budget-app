let budget = 0;
let expenses = [];

function setBudget() {
    const budgetInput = document.getElementById('budget');
    budget = parseFloat(budgetInput.value);
    budgetInput.value = '';
    updateSummary();
}

function addExpense() {
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');

    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);

    if (name && !isNaN(amount)) {
        expenses.push({ name, amount });
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        updateExpenseList();
        updateSummary();
        saveData();
    }
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${expense.name}: $${expense.amount} <button onclick="deleteExpense(${index})">Delete</button>`;
        expenseList.appendChild(listItem);
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateSummary();
    saveData();
}

function updateSummary() {
    const totalBudget = document.getElementById('totalBudget');
    const totalExpenses = document.getElementById('totalExpenses');
    const amountRemaining = document.getElementById('amountRemaining');

    totalBudget.textContent = budget.toFixed(2);
    totalExpenses.textContent = expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
    amountRemaining.textContent = (budget - totalExpenses.textContent).toFixed(2);
}

function saveData() {
    localStorage.setItem('budget', budget);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadData() {
    const savedBudget = localStorage.getItem('budget');
    const savedExpenses = localStorage.getItem('expenses');

    if (savedBudget) {
        budget = parseFloat(savedBudget);
        document.getElementById('budget').value = budget.toFixed(2);
    }

    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        updateExpenseList();
        updateSummary();
    }
}

loadData();