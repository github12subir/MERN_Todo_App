import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, removeTask } from "../features/task/taskSlice";
import { useEffect } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { tasks = [] } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((t) => (
          <div key={t._id}>
            <p>{t.title}</p>
            <button onClick={() => dispatch(removeTask(t._id))}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}