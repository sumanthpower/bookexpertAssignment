import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  searchEmployees,
  setSearchTerm,
  toggleStatus,
  updateEmployee,
} from "../utils/employeeSlice";
import EmployeeForm from "./EmployeeForm";

const EmployeeDetails = () => {
  const employees = useSelector((store) => store.emp.employees);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const applyFilters = (searchText, gender, status) => {
    let filtered = employees;

    // 🔍 Search filter
    if (searchText.trim() !== "") {
      filtered = filtered.filter(
        (emp) =>
          emp.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          emp.id.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 🚻 Gender filter
    if (gender !== "ALL") {
      filtered = filtered.filter((emp) => emp.gender === gender);
    }

    // ✅ Active / Inactive filter
    if (status !== "ALL") {
      filtered = filtered.filter((emp) =>
        status === "ACTIVE" ? emp.isActive : !emp.isActive
      );
    }

    setEmpArray(filtered);
  };

  const dispatch = useDispatch();
  const [empArray, setEmpArray] = useState(employees || []);
  const [userInput, setInput] = useState("");
  useEffect(() => {
    setEmpArray(employees);
  }, [employees]);
  // console.log(empArray);
  const changeActive = (emp) => {
    const filterData = empArray.map((empData) => {
      if (empData.id === emp.id) {
        return { ...empData, isActive: !empData.isActive };
      }
      return empData;
    });

    setEmpArray(filterData);
    dispatch(toggleStatus(emp.id));
  };

  const resetSearch = () => {
    setInput("");
    setEmpArray(employees);
  };

  const searchHandler = () => {
    dispatch(setSearchTerm(userInput));
    applyFilters(userInput, genderFilter, statusFilter);
  };
  return (
    <div className="flex flex-col w-full h-[90vh] shadow-sm">
      <label className="input flex items-center p-2 h-20 shadow-lg placeholder:text-4xl">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="search"
          required
          placeholder="Search"
          className="w-[50%] h-12 outline-none "
          value={userInput}
        />
        <button onClick={searchHandler}>
          <svg
            className="h-[2em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </button>
        <select
          className="select select-bordered w-40 bg-inherit"
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            applyFilters(userInput, e.target.value, statusFilter);
          }}
        >
          <option value="ALL">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          className="select select-bordered w-40 bg-inherit ml-4"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            applyFilters(userInput, genderFilter, e.target.value);
          }}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </label>

      <div>
        {empArray.length === 0 && (
          <div className="badge badge-error flex items-center flex-col p-10 shadow-lg ">
            <h1>Error........</h1>
            <h1>Click here to search Again</h1>
            <button
              onClick={resetSearch}
              className="bg-gray-800 text-white p-2 rounded-lg"
            >
              Click
            </button>
          </div>
        )}
      </div>

      {empArray.length > 0 && (
        <div className="overflow-x-auto p-4 w-[100%] overflow-y-auto min-h-[90%] ">
          <table className="table w-full">
            <thead className="p-1 text-left">
              <tr>
                <th>Employee ID</th>
                <th>Profile</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>State</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {empArray.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          className="rounded-3xl"
                          src={emp.profileImage}
                          alt={emp.fullName}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="">{emp.fullName}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.state}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={emp.isActive}
                      onChange={() => changeActive(emp)}
                    />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-info bg-orange-300 p-2 m-2 rounded-lg"
                        onClick={() => {
                          setEditEmp(emp);
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline btn-error bg-red-100 p-2 m-2 rounded-lg"
                        onClick={() => {
                          setSelectedEmp(emp);
                          setShowConfirm(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 🔔 Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              Confirm Delete
            </h2>

            <p className="mb-6">
              Are you sure you want to delete <b>{selectedEmp?.fullName}</b>?
            </p>

            <div className="flex justify-end gap-4">
              {/* NO BUTTON */}
              <button
                className="btn btn-sm"
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedEmp(null);
                }}
              >
                No
              </button>

              {/* YES BUTTON */}
              <button
                className="btn btn-sm btn-error"
                onClick={() => {
                  dispatch(deleteEmployee(selectedEmp.id));
                  setShowConfirm(false);
                  setSelectedEmp(null);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ✏️ Edit Employee Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-opacity-10 bg-green-500 flex items-center justify-center z-50">
          <EmployeeForm
            mode="edit"
            initialData={editEmp}
            onClose={() => {
              setIsEditing(false);
              setEditEmp(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
