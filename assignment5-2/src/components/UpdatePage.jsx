import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://6915289d84e8bd126af8d8de.mockapi.io/users";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    part: "",
    age: "",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setForm(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setCount((prev) => prev + 1); 
  };

  const handleSave = async () => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/list");
  };

  return (
    <div>
      <h2 className="mb-4">데이터 수정</h2>
      <p className="text-muted">총 수정 횟수: {count}회</p>

      <div className="mb-3">
        <label>이름</label>
        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>이메일</label>
        <input
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        저장
      </button>
    </div>
  );
}
