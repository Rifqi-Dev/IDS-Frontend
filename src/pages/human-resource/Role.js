import { useEffect, useState } from "react";
import { GetRole } from "../../services";

function Role() {
  const [roleList, setRoleList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const fetchRole = async (page, pageSize, keyword = "", resetPage = false) => {
    setLoading(resetPage);
    await GetRole(page - 1, pageSize, keyword).then((r) => {
      setLoading(false);
      setRoleList(r.data.data);
    });
  };

  useEffect(() => {
    fetchRole(page, pageSize, "", true);
  }, []);
  return <div>Role</div>;
}

export default Role;
