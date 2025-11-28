import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://6915289d84e8bd126af8d8de.mockapi.io/users";

export default function DetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (e) {
        console.error(e);
        alert("상세 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div>불러오는 중...</div>;
  if (!user) return <div>데이터가 없습니다.</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <span>상세 정보 (id: {user.id})</span>
        <Link className="btn btn-sm btn-outline-secondary" to="/list">
          목록으로
        </Link>
      </div>
      <div className="card-body">
        <dl className="row mb-0">
          <dt className="col-sm-2">name</dt>
          <dd className="col-sm-10">{user.name}</dd>

          <dt className="col-sm-2">part</dt>
          <dd className="col-sm-10">{user.part}</dd>

          <dt className="col-sm-2">age</dt>
          <dd className="col-sm-10">{user.age}</dd>

          <dt className="col-sm-2">city</dt>
          <dd className="col-sm-10">{user.city}</dd>

          <dt className="col-sm-2">email</dt>
          <dd className="col-sm-10">{user.email}</dd>
        </dl>
      </div>
    </div>
  );
}
