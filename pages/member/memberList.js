import React, { useState, useEffect } from 'react';
import Footer from '@/components/layout/default/footer';
import NavHeader from '@/components/layout/default/navHeader';
import scss from '@/pages/member/memberList.module.scss';

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('http://localhost:3005/api/users')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setMembers(data.data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const thisPage = page * perPage;
  const firstMember = thisPage - perPage;
  const currentMembers = members && members.length > 0 ? members.slice(firstMember, thisPage) : [];

  const changePage = (pageNum) => setPage(pageNum);
  return (
    <>
      <NavHeader />
      <main className={scss.container}>
            <div>
        {currentMembers.map(data => (
          <div key={data.id}>
            <p>ID: {data.data.user.id}</p>
            <p>Name: {data.data.user.id}</p>
          </div>
        ))}
      </div>
        <div>
          <button onClick={() => changePage(page - 1)} disabled={page === 1}>
            上一頁
          </button>
          <span>{page}</span>
          <button
            onClick={() => changePage(page + 1)}
            disabled={thisPage >= members?.length}
          >
            下一頁
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}