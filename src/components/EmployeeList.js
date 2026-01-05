import React from "react";

const EmployeeList = () => {
  return (
    <div className="form-container">
      <form className="modern-form">
        <h2 className="form-title">Employee Details</h2>
        <div className="image-section">
          <div className="image-preview">
            <div className="placeholder-text">Upload Photo</div>
          </div>
          <input type="file" id="file-upload" className="hidden-input" />
          <label htmlFor="file-upload" className="upload-btn">
            Choose Image
          </label>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="e.g. John Doe" />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" />
          </div>

          <div className="input-group">
            <label>State</label>
            <select>
              <option>Select State</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
            </select>
          </div>
        </div>

        <div className="status-section">
          <label className="switch-container">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
          <span>Active Employee</span>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeList;
