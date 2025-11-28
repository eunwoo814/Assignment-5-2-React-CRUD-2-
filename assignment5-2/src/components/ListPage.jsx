import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6915289d84e8bd126af8d8de.mockapi.io/users";

export default function ListPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const loadUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h2 className="mb-4">사용자 목록</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/detail")}
      >
        새 데이터 추가
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>part</th>
            <th>age</th>
            <th>city</th>
            <th>email</th>
            <th>액션</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.part}</td>
              <td>{u.age}</td>
              <td>{u.city}</td>
              <td>{u.email}</td>

              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => navigate(`/update/${u.id}`)}
                >
                  수정
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(u.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
