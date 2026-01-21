import { useState } from "react";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    date: "",
    desc: "",
    amount: "",
    category: "Groceries",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.desc) return;

    onAdd(form);

    // ✅ Clear inputs after add
    setForm({
      date: "",
      desc: "",
      amount: "",
      category: "Groceries",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-4"
    >
      <div className="flex gap-3 items-end">

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-lg px-3 py-2 flex-1"
        />

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border rounded-lg px-3 py-2 w-32"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option>Groceries</option>
          <option>Rent</option>
          <option>Utilities</option>
          <option>Transport</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          Add
        </button>

      </div>
    </form>
  );
}
