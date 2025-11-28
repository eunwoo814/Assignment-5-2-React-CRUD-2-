import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_URL = "https://6915289d84e8bd126af8d8de.mockapi.io/users";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    part: "web",
    age: "",
    city: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setForm({
          name: data.name || "",
          part: data.part || "web",
          age: data.age ?? "",
          city: data.city || "",
          email: data.email || "",
        });
      } catch (e) {
        console.error(e);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("name을 입력하세요.");
      nameRef.current?.focus();
      return;
    }
    if (!form.email.trim()) {
      alert("email을 입력하세요.");
      emailRef.current?.focus();
      return;
    }

    const body = {
      name: form.name.trim(),
      part: form.part,
      age: Number(form.age) || 0,
      city: form.city.trim(),
      email: form.email.trim(),
    };

    try {
      setLoading(true);
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("수정이 완료되었습니다.");
      navigate("/list");
    } catch (e) {
      console.error(e);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <span>데이터 수정 (id: {id})</span>
        <Link className="btn btn-sm btn-outline-secondary" to="/list">
          목록으로
        </Link>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">name</label>
          <input
            className="form-control"
            name="name"
            ref={nameRef}
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">part</label>
          <select
            className="form-select"
            name="part"
            value={form.part}
            onChange={handleChange}
          >
            <option value="web">web</option>
            <option value="server">server</option>
            <option value="ios">ios</option>
            <option value="android">android</option>
            <option value="design">design</option>
            <option value="ai">ai</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={form.age}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">city</label>
          <input
            className="form-control"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            ref={emailRef}
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}
