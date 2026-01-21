let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

console.log("✅ script.js loaded");

let editingExpenseId = null;
let lastDeletedExpense = null;

let expenseChart = null;
let monthChart = null;

function autoCategory(desc) {
  console.log("DESC TYPE:", typeof desc, desc);
  desc = desc.toLowerCase();

  if (desc.includes("electric") || desc.includes("bill")||
      desc.includes("water") || desc.includes("Gas") || 
      desc.includes("Internet"))
    return "Utilities";
  if (desc.includes("rent") || desc.includes("emi") ||
      desc.includes("Maintenance") || desc.includes("Education Loan"))
    return "Housing";
  if (desc.includes("swiggy") || desc.includes("zomato"))
    return "Groceries";
  if (desc.includes("petrol") || desc.includes("fuel") ||
      desc.includes("Ola") || desc.includes("Uber"))
    return "Transport";
  if (desc.includes("Maid") || desc.includes("cook") ||
      desc.includes("Driver") || desc.includes("Car Clean"))
    return "Household Help";
  if (desc.includes("hospital") || desc.includes("doctor") || 
      desc.includes("Medicine"))
    return "Medical";

  return "Others";
}


function refreshUI() {
  const monthSelect = document.getElementById("monthFilter");
  const selectedMonth = monthSelect.value;

  loadMonthFilter();
  
  // Restore selection if still exists
  if ([...monthSelect.options].some(o => o.value === selectedMonth)) {
    monthSelect.value = selectedMonth;
  }
  renderExpenses();
}

function normalizeDate(date) {
  if (!date) return null;

  // Already YYYY-MM-DD
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) return null;

  return d.toISOString().slice(0, 10);
}

function getMonthKey(date) {
<!--
  const d = normalizeDate(date);
  return d ? d.slice(0, 7) : null;
-->
  if (!date) return null;
  
  // If date is already YYYY-MM-DD string
  if (typeof date === "string") {
    return date.slice(0, 7);
  }

  // If date is Date object
  if (date instanceof Date && !isNaN(date)) {
    return date.toISOString().slice(0, 7);
  }

  return null;
}

function loadMonthFilter() {
  const select = document.getElementById("monthFilter");
  select.innerHTML = `<option value="">All Months</option>`; //

  const months = [
     ...new Set(
     expenses
        .map(e => getMonthKey(e.date))
        .filter(m => m)   // 🔑 REMOVE null / undefined
    )
  ].sort();              // 🔑 Optional but recommended

  months.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.text = m;
    select.appendChild(opt);
  });

  console.log("LoadMonthFilter TYPE:");
}

function clearForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = ""; // resets to auto-detect
  document.getElementById("date").value = ""; // resets to auto-detect
}


function addExpense() {
  const descInput = document.getElementById("desc");
  const amountInput = document.getElementById("amount");
  const categoryInput = document.getElementById("category");

  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);

  let valid = true;

  let date = document.getElementById("date").value;

  if (!date) {
    date = new Date().toISOString().slice(0, 10);
  }
  // Clear previous errors
  document.getElementById("descError").textContent = "";
  document.getElementById("amountError").textContent = "";

  // Description validation
  if (!desc) {
    document.getElementById("descError").textContent = 
       "Description is required";
    valid = false;
  }

  // Amount validation
  if (!amountInput.value || amount <= 0) {
    document.getElementById("amountError").textContent =
      "Enter a valid amount greater than 0";
    valid = false;
  }

  if (!valid) return;

  let  category = categoryInput.value;;
  console.log("addExpense category TYPE:", typeof category, category);
  if (!category) category  = autoCategory(desc);

  if (!date || !desc || !amount) return alert("Fill all fields");

  const expense = {
    id: Date.now(), // ✅ unique
    date: date,
    desc: desc,
    category: category,
    amount: Number(amountInput.value)
  };

  if (editingExpenseId) 
  {
    const index = expenses.findIndex(e => e.id === editingExpenseId);
    expenses[index] = expense;
    editingExpenseId = null;
    document.getElementById("addBtn").innerText = "Add Expense";
  } 
  else 
  {
    expenses.push(expense);
  }
  localStorage.setItem("expenses", JSON.stringify(expenses));

  refreshUI();
  clearForm(); // ⭐ reset inputs
}

function startEditExpense(id) {
  const exp = expenses.find(e => e.id === id);
  if (!exp) return;

  document.getElementById("date").value = exp.date;
  document.getElementById("desc").value = exp.desc;
  document.getElementById("amount").value = exp.amount;
  document.getElementById("category").value = exp.category;

  editingExpenseId = id;

  document.getElementById("addBtn").innerText = "Update Expense";
}

let chart;

function safeDestroyChart(chartVarName) {
  const chart = window[chartVarName];
  if (chart && typeof chart.destroy === "function") {
    chart.destroy();
  }
  window[chartVarName] = null;
}

function renderMonthChart(monthTotals) {
  const canvas = document.getElementById("monthChart");
  if (!canvas) return;

  console.log("renderMonthChart monthTotals TYPE:", typeof monthTotals, monthTotals);

  // 🛑 Ensure valid object
  if (
    !monthTotals ||
    typeof monthTotals !== "object" ||
    Array.isArray(monthTotals) ||
    Object.keys(monthTotals).length === 0
  ) {
     safeDestroyChart("monthChart");
     return;
    }

  const ctx = canvas.getContext("2d");

  safeDestroyChart("monthChart");

  window.monthChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(monthTotals),
      datasets: [{
        label: "Monthly Expenses",
        data: Object.values(monthTotals),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  const total = document.getElementById("total");
  list.innerHTML = "";
  
  let sum = 0;
  let categoryTotals = {};
  let monthTotals = {}; 

  const selectedMonth = document.getElementById("monthFilter").value;

  expenses.forEach(e => {
  if (!normalizeDate(e.date)) {
    console.warn("Invalid date record:", e);
  }
  });
  const filteredExpenses = selectedMonth ===""
  ? expenses
  : expenses.filter(e => getMonthKey(e.date) === selectedMonth);

  filteredExpenses.forEach(e => {
    const month = e.date.slice(0, 7);
    const amount = Number(e.amount);
    if (!month) return;
    if (isNaN(amount)) return;

    console.log(amount);
    if (!monthTotals[month]) {
      monthTotals[month] = 0;
    }

    monthTotals[month] += amount;
    sum += amount;
    console.log(month, monthTotals[month]);
    categoryTotals[e.category] = 
      (categoryTotals[e.category] || 0) + e.amount;

  list.innerHTML += `
    <tr>
      <td>${e.date}</td>
      <td>${e.desc}</td>
      <td>${e.category}</td>
      <td>₹${e.amount}</td>
      <td>
        <button onclick="startEditExpense(${e.id})">✏️</button>
        <button onclick="deleteExpense(${e.id})">❌</button>
      </td>
    </tr>`;
  });

  Object.keys(monthTotals).forEach(month => {
     console.log(month, monthTotals[month]);
  });
  total.innerText = sum;
  renderChart(categoryTotals);
  renderMonthChart(monthTotals);
}

function renderChart(categoryTotals) {
  const canvas = document.getElementById("expenseChart");
  if (!canvas) return;

  if (!categoryTotals || Object.keys(categoryTotals).length === 0) {
    if (expenseChart) {
      expenseChart.destroy();
      expenseChart = null;
    }
    return;
  }

  const ctx = canvas.getContext("2d");

  if (expenseChart) {
    expenseChart.destroy();
  }

  expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function showUndoToast() 
{
  const undo = confirm("Expense deleted. Undo?");
  if (undo && lastDeletedExpense) {
    expenses.push(lastDeletedExpense);
    lastDeletedExpense = null;
    localStorage.setItem("expenses", JSON.stringify(expenses));
    refreshUI();
  }
}

function deleteExpense(id) 
{
  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) return;

  lastDeletedExpense = expenses[index];

  expenses = expenses.filter(e => e.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  refreshUI();
}

function getTimestamp() {
  const now = new Date();

  const pad = n => n.toString().padStart(2, "0");

  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

  return `${date}_${time}`;
}

function exportBackup() {
  if (expenses.length === 0) {
    alert("No expenses to backup");
    return;
  }

  const dataStr = JSON.stringify(expenses, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `expenses-backup-${getTimestamp()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

function exportCSV() {
  if (expenses.length === 0) {
    alert("No expenses to export");
    return;
  }

  let csv = "Date,Description,Category,Amount\n";

  expenses.forEach(e => {
    csv += `${e.date},"${e.desc}",${e.category},${e.amount}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `expenses-backup-${getTimestamp()}.csv`;
  a.click();

  URL.revokeObjectURL(url);
}

function importBackup() {
  const fileInput = document.getElementById("importFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a backup file");
    return;
  }

  // 🔴 DISCLAIMER CONFIRMATION
  const confirmImport = confirm(
    "⚠️ WARNING!\n\n" +
    "Importing a backup will OVERWRITE all current expense data.\n" +
    "This action cannot be undone.\n\n" +
    "Do you want to continue?"
  );

  if (!confirmImport) {
    fileInput.value = "";
    return; // User cancelled
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedData = JSON.parse(e.target.result);

      if (!Array.isArray(importedData)) {
        alert("Invalid backup file");
        return;
      }
      expenses = importedData.map((e, index) => ({
        id: typeof e.id === "number" ? e.id : Date.now() + index,
        date: e.date,
        desc: e.desc || "",
        category: e.category || "Others",
        amount: Number(e.amount) || 0
      }));

      localStorage.setItem("expenses", JSON.stringify(expenses));
      refreshUI();
      alert("✅ Backup restored successfully");
      fileInput.value = "";
    } catch {
      alert("❌Error reading backup file");
    }
  };

  reader.readAsText(file);
}

refreshUI();
