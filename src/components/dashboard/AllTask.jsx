// AllTask.jsx
import { useDrop } from "react-dnd";
import CustomContainer from "../shared/CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import Loader from "../shared/Loader";
import useAuth from "../shared/useAuth";
import { axiosPublic } from "../shared/useAxios";
import TaskCard from "./TaskCard";
import { Helmet } from "react-helmet";

const AllTask = () => {
  const { user, handleAlert } = useAuth();

  const { isLoading, data: tasks, refetch } = Loader("/tasks", "tasks");

  const handleTodoDrop = (item) => {
    // Handle task drop in Todo section
    axiosPublic
      .put(`/tasks/${item.id}`, { status: "todo" })
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Task status updated successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOngoingDrop = (item) => {
    // Handle task drop in Ongoing section
    axiosPublic
      .put(`/tasks/${item.id}`, { status: "ongoing" })
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Task status updated successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCompletedDrop = (item) => {
    // Handle task drop in Completed section
    axiosPublic
      .put(`/tasks/${item.id}`, { status: "completed" })
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Task status updated successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const [, todoDrop] = useDrop({
    accept: "TASK",
    drop: handleTodoDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [, ongoingDrop] = useDrop({
    accept: "TASK",
    drop: handleOngoingDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [, completedDrop] = useDrop({
    accept: "TASK",
    drop: handleCompletedDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const filteredTasks = tasks?.filter(
    (task) => task?.hostEmail === user?.email
  );

  const todoTasks = filteredTasks?.filter((task) => task?.status === "todo");
  const ongoingTasks = filteredTasks?.filter(
    (task) => task?.status === "ongoing"
  );
  const completedTasks = filteredTasks?.filter(
    (task) => task?.status === "completed"
  );

  return (
    <CustomContainer className={`mt-10`}>
      <Helmet>
        <title>Task Manager | Management</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-20">Manage All Tasks</h1>

      {/* To Do section */}
      <h1 className="text-2xl font-semibold text-center mb-5">To Do</h1>

      <hr className="border-b-2 border-gray-500 mx-5"></hr>

      <section
        ref={todoDrop}
        className="mb-20 py-10 text-center flex flex-wrap gap-10 justify-around items-center"
      >
        {todoTasks &&
          todoTasks?.map((task, index) => (
            <TaskCard
              key={task?._id}
              task={task}
              index={index}
              refetch={refetch}
            ></TaskCard>
          ))}
      </section>

      {/* Ongoing section */}
      <h1 className="text-2xl font-semibold text-center mb-5">Ongoing</h1>

      <hr className="border-b-2 border-gray-500 mx-5"></hr>

      <section
        ref={ongoingDrop}
        className="mb-20 py-20 text-center flex flex-wrap gap-10 justify-around items-center"
      >
        {ongoingTasks &&
          ongoingTasks?.map((task, index) => (
            <TaskCard
              key={task?._id}
              task={task}
              index={index}
              refetch={refetch}
            ></TaskCard>
          ))}
      </section>

      {/* Completed section */}
      <h1 className="text-2xl font-semibold text-center mb-5">Completed</h1>

      <hr className="border-b-2 border-gray-500 mx-5"></hr>

      <section
        ref={completedDrop}
        className="mb-20 py-20 text-center flex flex-wrap gap-10 justify-around items-center"
      >
        {completedTasks &&
          completedTasks?.map((task, index) => (
            <TaskCard
              key={task?._id}
              task={task}
              index={index}
              refetch={refetch}
            ></TaskCard>
          ))}
      </section>
    </CustomContainer>
  );
};

export default AllTask;
