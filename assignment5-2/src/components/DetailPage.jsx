import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6915289d84e8bd126af8d8de.mockapi.io/users";

export default function DetailPage() {
  const nameRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!nameRef.current.value.trim()) {
      alert("이름을 입력하세요.");
      nameRef.current.focus();
      return;
    }
    if (!emailRef.current.value.trim()) {
      alert("이메일을 입력하세요.");
      emailRef.current.focus();
      return;
    }

    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      city: "Seoul",
      part: "web",
      age: 20,
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    navigate("/list");
  };

  return (
    <div>
      <h2 className="mb-4">새 데이터 추가</h2>

      <div className="mb-3">
        <label className="form-label">이름</label>
        <input className="form-control" ref={nameRef} />
      </div>

      <div className="mb-3">
        <label className="form-label">이메일</label>
        <input className="form-control" ref={emailRef} />
      </div>

      <button className="btn btn-primary" onClick={handleCreate}>
        저장
      </button>
    </div>
  );
}
