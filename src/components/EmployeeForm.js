import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addEmployee,
  updateEmployee,
  toggleDashBoard,
} from "../utils/employeeSlice";

const EmployeeForm = ({ mode = "add", initialData = null, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    gender: "Male",
    dob: "",
    state: "Maharashtra",
    isActive: true,
    profileImage: "https://i.pravatar.cc/150?u=new",
  });
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "edit") {
      dispatch(updateEmployee(formData));
    } else {
      dispatch(
        addEmployee({
          ...formData,
          id: "EMP" + Math.floor(Math.random() * 10000),
        })
      );
    }

    onClose ? onClose() : dispatch(toggleDashBoard());
  };

  return (
    <div className="card bg-base-200 w-full max-w-2xl shadow-xl p-6 bg-gray-400 rounded-md h-2/4 mt-3">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Edit Employee" : "Add Employee"}
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input input-bordered"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="input input-bordered"
          required
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option>Maharashtra</option>
          <option>Gujarat</option>
          <option>Karnataka</option>
          <option>Tamil Nadu</option>
          <option>Delhi</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label className="flex items-center gap-4">
          Active
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="toggle toggle-success"
          />
        </label>

        <div className="md:col-span-2 flex justify-end gap-4">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              if (mode === "edit") {
                onClose();
              } else {
                dispatch(toggleDashBoard());
              }
            }}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
