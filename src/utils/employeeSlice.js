import { createSlice } from "@reduxjs/toolkit";
// Make sure this path matches your file structure
import initialEmployeeData from "../mocks/EmployeeData.json";

const employeeSlice = createSlice({
  name: "emp",
  initialState: {
    isMenuOpen: true,
    isDashBoardOpen: false,
    searchTerm: "",
    employees: initialEmployeeData, // Initialize with your 20 unique emps
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    toggleDashBoard: (state) => {
      state.isDashBoardOpen = !state.isDashBoardOpen;
    },

    addEmployee: (state, action) => {
      state.employees.unshift(action.payload); // unshift adds to the top of the list
    },

    // Deletes an employee by filtering out their ID
    deleteEmployee: (state, action) => {
      console.log("triggeredDelete");
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },

    // Toggles the isActive boolean for a specific employee
    toggleStatus: (state, action) => {
      const employee = state.employees.find((emp) => emp.id === action.payload);
      if (employee) {
        employee.isActive = !employee.isActive;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
});

export const {
  toggleMenu,
  closeMenu,
  toggleDashBoard,
  addEmployee,
  deleteEmployee,
  toggleStatus,
  setSearchTerm,
  updateEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
