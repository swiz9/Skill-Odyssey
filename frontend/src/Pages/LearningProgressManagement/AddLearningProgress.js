import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import "../../styles/theme.css";
import "../PostManagement/AddNewPost.css";

const customStyles = `
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

function AddLearningProgress() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    postOwnerID: "",
    category: "",
    postOwnerName: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState({ title: 0, description: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (userId) {
      setFormData((prevData) => ({ ...prevData, postOwnerID: userId }));
      fetch(`http://localhost:8080/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.fullname) {
            setFormData((prevData) => ({
              ...prevData,
              postOwnerName: data.fullname,
            }));
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return value.length < 5 ? "Title must be at least 5 characters" : "";
      case "description":
        return value.length < 10
          ? "Description must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setCharCount((prev) => ({
      ...prev,
      [name]: value.length,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      if (!file.type.match("image.*")) {
        alert("Only image files are allowed");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange({ target: { files: [file] } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadProgress(0);

    try {
      let imageUrl = "";
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("file", image);

        const uploadResponse = await fetch(
          "http://localhost:8080/learningprogress/upload",
          {
            method: "POST",
            body: formDataImage,
          }
        );

        if (!uploadResponse.ok) throw new Error("Image upload failed");
        imageUrl = await uploadResponse.text();
      }

      const response = await fetch("http://localhost:8080/learningprogress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to add learning progress");

      alert("Learning Progress added successfully!");
      window.location.href = "/myLearningProgress";
    } catch (error) {
      alert(error.message || "Failed to add Learning Progress.");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="auth-container">
      <style>{customStyles}</style>
      <NavBar />
      <div className="content-wrapper">
        <div className="post-card">
          <div className="post-header">
            <h1 className="post-heading">Add Learning Progress</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-sections two-column-layout">
              <div className="form-column">
                <div className="form-section">
                  <h3 className="section-title">Basic Information</h3>
                  <div className="form-group">
                    <label className="form-label">
                      Title <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        className={`form-input ${errors.title ? "error" : ""}`}
                        type="text"
                        name="title"
                        placeholder="Enter learning progress title"
                        value={formData.title}
                        onChange={handleChange}
                        maxLength="100"
                        required
                        style={{ color: "#FFFFFF" }}
                      />
                      <span className="char-count">{charCount.title}/100</span>
                    </div>
                    {errors.title && (
                      <span className="error-message">{errors.title}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Skill Area <span className="required">*</span>
                    </label>
                    <select
                      className="form-input"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      style={{ color: "#FFFFFF" }}
                    >
                      <option value="" disabled>
                        Select Skill Area
                      </option>
                      <option value="Web Development">Web Development</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="Public Speaking">Public Speaking</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="Personal Finance">Personal Finance</option>
                      <option value="Photography">Photography</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <div className="input-wrapper date-input-wrapper">
                      <input
                        className="form-input"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        style={{ color: "#FFFFFF" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-column">
                <div className="form-section">
                  <h3 className="section-title">Learning Progress Details</h3>
                  <div className="form-group">
                    <label className="form-label">
                      Details <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <textarea
                        className={`form-input ${
                          errors.description ? "error" : ""
                        }`}
                        name="description"
                        placeholder="Describe your learning progress"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength="500"
                        required
                        rows={4}
                        style={{ color: "#FFFFFF" }}
                      />
                      <span className="char-count">
                        {charCount.description}/500
                      </span>
                    </div>
                    {errors.description && (
                      <span className="error-message">
                        {errors.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-column full-width">
                <div className="form-section">
                  <h3 className="section-title">Learning Progress Image</h3>
                  <p className="section-description">
                    Add an image to represent your learning journey
                  </p>
                  <div className="form-group">
                    <div
                      className={`drop-zone ${isDragging ? "dragging" : ""} ${
                        isLoading ? "loading" : ""
                      }`}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={handleDrop}
                    >
                      {imagePreview ? (
                        <div className="media-preview-container">
                          <div className="media-preview-grid">
                            <div className="preview-item">
                              <div className="preview-content">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="media-item"
                                />
                                <button
                                  type="button"
                                  className="remove-btn"
                                  onClick={() => {
                                    setImage(null);
                                    setImagePreview(null);
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="drop-zone-content">
                          <i className="fas fa-cloud-upload-alt"></i>
                          <p style={{ color: "#FFFFFF" }}>
                            Drag and drop image here or
                          </p>
                          <input
                            type="file"
                            id="fileInput"
                            className="file-input"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                          <label htmlFor="fileInput" className="browse-button">
                            Browse Files
                          </label>
                        </div>
                      )}
                      <div className="file-limits">
                        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          Maximum file size: 10MB
                        </p>
                        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          Supported formats: JPG, PNG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={
                  isLoading || Object.keys(errors).some((key) => errors[key])
                }
              >
                {isLoading
                  ? "Adding Learning Progress..."
                  : "Add Learning Progress"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLearningProgress;
