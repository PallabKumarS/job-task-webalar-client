/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import useAuth from "../shared/useAuth";
import { axiosPublic } from "../shared/useAxios";

const UpdateModal = ({ rowData, open, setSelectedRowData, refetch }) => {
  const { user, handleAlert } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData("");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosPublic
      .put(`/tasks/${rowData._id}?email=${user?.email}`, data)
      .then((res) => {
        if (res.status === 201) {
          refetch();
          closeModal();
          handleAlert("success", "Task updated successfully");
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  return (
    <>
      <dialog
        id="my_modal_3"
        className="modal"
        open={isModalOpen}
        onClick={closeModal}
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <div className="my-12">
            <h1 className="text-center text-5xl font-bold">
              Update <span className="text-rose">Task</span>
            </h1>
          </div>

          {/* update part  */}

          <form className="mb-12" onSubmit={handleSubmit(onSubmit)}>
            {/* task name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Name</span>
              </label>
              <label className="input-group">
                <Controller
                  name="taskName"
                  defaultValue={rowData?.taskName}
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
                    defaultValue={rowData?.priority}
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
                    defaultValue={new Date(rowData?.time)}
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

              {/* target Status  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Target Status</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="status"
                    defaultValue={rowData?.status}
                    control={control}
                    rules={{ required: "Target Status is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`select select-bordered w-full ${
                          errors.status ? "select-error" : ""
                        }`}
                        defaultValue=""
                      >
                        <option disabled value="">
                          Select Status. . .
                        </option>
                        <option value="todo">To Do</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    )}
                  />
                </label>
                {errors.status && (
                  <span className="text-error">{errors.status.message}</span>
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
                    defaultValue={rowData?.description}
                    control={control}
                    rules={{ required: "Task Description is required" }}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Task Description...."
                        className={`textarea w-full h-32 textarea-bordered textarea-lg ${
                          errors.description ? "textarea-error" : ""
                        }`}
                      ></textarea>
                    )}
                  />
                </label>
                {errors.description && (
                  <span className="text-error">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
            <button type="submit" className="w-full bg-rose text-white btn">
              Update Task
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateModal;
