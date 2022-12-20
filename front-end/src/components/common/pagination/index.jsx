import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions, getUsersQuestions } from "../../../redux/thunks/question.thunks";

function Pagination({list}) {
    const dispatch = useDispatch();
  let { questions } = useSelector((state) => state.questions);
  const total = questions?.total;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const goToPrevious = () => {
    setPage((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const goToNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (list === "all") {
      dispatch(fetchAllQuestions({ limit, page, list: "all" }));
    } else {
      dispatch(getUsersQuestions({ limit, page, list: "mine" }));
    }
  }, [limit, page, list]);
  return (
    <div className="pagination">
      <button onClick={goToPrevious} disabled={page === 1} className="prev">
        Prev
      </button>
      <span>
        Page {page} - {limit} of {total}
      </span>
      {console.log(Math.ceil(total / limit), page)}
      <button
        disabled={page >= Math.ceil(total / limit)}
        onClick={goToNext}
        className="next"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
