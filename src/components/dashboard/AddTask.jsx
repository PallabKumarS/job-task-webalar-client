import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../shared/useAuth";
import { Helmet } from "react-helmet";
import CustomContainer from "../shared/CustomContainer";
import { axiosPublic } from "../shared/useAxios";
const AddTask = () => {
  const { user, handleAlert } = useAuth();
  const hostName = user?.displayName;
  const hostEmail = user?.email;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newTask = {
      ...data,
      hostName,
      hostEmail,
      status: "todo",
    };
    axiosPublic.post("/tasks", newTask).then((res) => {
      if (res.status == 201) {
        handleAlert("success", "Task added successfully");
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Task Manager | Add Tasks</title>
      </Helmet>
      <CustomContainer>
        <div className="my-12">
          <h1 className="text-center text-5xl font-bold">
            Add <span className="text-teal-500">Tasks</span>
          </h1>
        </div>
        <form className="mb-12" onSubmit={handleSubmit(onSubmit)}>
          {/* task name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Name</span>
            </label>
            <label className="input-group">
              <Controller
                name="taskName"
                control={control}
                rules={{ required: "Task Name is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Task Name...."
                    className={`input input-bordered w-full ${
                      errors.taskName ? "input-error" : ""
                    }`}
                  />
                )}
              />
            </label>
            {errors.taskName && (
              <span className="text-error">{errors.taskName.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* target Priority */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Target Priority</span>
              </label>
              <label className="input-group">
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: "Target Priority is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`select select-bordered w-full ${
                        errors.priority ? "select-error" : ""
                      }`}
                      defaultValue=""
                    >
                      <option disabled value="">
                        Select Priority. . .
                      </option>
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </select>
                  )}
                />
              </label>
              {errors.priority && (
                <span className="text-error">{errors.priority.message}</span>
              )}
            </div>
            {/* Date and Time */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <label className="input-group">
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: "Deadline is required" }}
                  render={({ field }) => (
                    <ReactDatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      required
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select Deadline..."
                      className={`input input-bordered w-full ${
                        errors.time ? "input-error" : ""
                      }`}
                    />
                  )}
                />
              </label>
              {errors.time && (
                <span className="text-error">{errors.time.message}</span>
              )}
            </div>
          </div>

          {/* Comprehensive Description */}
          <div className="md:flex mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Task Description</span>
              </label>
              <label className="input-group">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Task Description is required" }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Task Description...."
                      className={`textarea w-full h-52 textarea-bordered textarea-lg ${
                        errors.description ? "textarea-error" : ""
                      }`}
                    ></textarea>
                  )}
                />
              </label>
              {errors.description && (
                <span className="text-error">{errors.description.message}</span>
              )}
            </div>
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white btn">
            Add Task
          </button>
        </form>
      </CustomContainer>
    </div>
  );
};

export default AddTask;
