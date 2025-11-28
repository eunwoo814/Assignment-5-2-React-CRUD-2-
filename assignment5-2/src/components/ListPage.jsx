import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://6915289d84e8bd126af8d8de.mockapi.io/users";

export default function ListPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUsers = async (q) => {
    try {
      setLoading(true);
      const url = q ? `${API_URL}?search=${encodeURIComponent(q)}` : API_URL;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error(e);
      alert("목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers(keyword.trim());
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">사용자 목록</h3>
        <span className="text-muted">
          {loading ? "불러오는 중..." : `총 ${users.length}건`}
        </span>
      </header>

      <form
        className="d-flex justify-content-end gap-2 mb-3"
        onSubmit={handleSearch}
      >
        <input
          className="form-control w-auto"
          placeholder="이름 / 도시 / 파트 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit">
          검색
        </button>
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={() => {
            setKeyword("");
            loadUsers();
          }}
        >
          초기화
        </button>
      </form>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-sm mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: 60 }}>id</th>
                <th>name</th>
                <th>part</th>
                <th style={{ width: 80 }}>age</th>
                <th>city</th>
                <th>email</th>
                <th style={{ width: 180 }}>액션</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>
                    <span className="badge text-bg-secondary text-uppercase">
                      {u.part}
                    </span>
                  </td>
                  <td>{u.age}</td>
                  <td>{u.city}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-outline-secondary me-2"
                      to={`/detail/${u.id}`}
                    >
                      상세
                    </Link>
                    <Link
                      className="btn btn-sm btn-outline-primary me-2"
                      to={`/update/${u.id}`}
                    >
                      수정
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
