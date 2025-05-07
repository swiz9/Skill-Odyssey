import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsGrid, BsListUl } from "react-icons/bs";
import NavBar from "../../Components/NavBar/NavBar";
import { IoIosCreate } from "react-icons/io";

function MyLearningProgress() {
  const [progressData, setProgressData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    fetch("http://localhost:8080/learningprogress")
      .then((response) => response.json())
      .then((data) => {
        const userFilteredData = data.filter(
          (item) => item.postOwnerID === userId
        );
        setProgressData(userFilteredData);
        setFilteredData(userFilteredData);
      })
      .catch((error) =>
        console.error("Error fetching Learning Progress data:", error)
      );
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Learning Progress?")
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080/learningprogress/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Learning Progress deleted successfully!");
          setFilteredData(
            filteredData.filter((progress) => progress.id !== id)
          );
        } else {
          alert("Failed to delete Learning Progress.");
        }
      } catch (error) {
        console.error("Error deleting Learning Progress:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = progressData.filter(
      (progress) =>
        progress.title.toLowerCase().includes(query) ||
        progress.description.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="container">
        <NavBar />

        <div className="content-section">
          <div className={`post_card_container ${viewMode}`}>
            {filteredData.length === 0 ? (
              <div className="not_found_box">
                <div className="not_found_img"></div>
                <p className="not_found_msg">
                  No posts found. Please create a new post.
                </p>
                <button
                  className="not_found_btn"
                  onClick={() =>
                    (window.location.href = "/addLearningProgress")
                  }
                >
                  Create New Post
                </button>
              </div>
            ) : (
              filteredData.map((progress) => (
                <div key={progress.id} className="post_card">
                  <div className="user_details_card">
                    <div className="name_section_post">
                      <p className="name_section_post_owner_name">
                        {progress.postOwnerName}
                      </p>
                      <p className="date_card_dte">{progress.date}</p>
                    </div>
                    {progress.postOwnerID === userId && (
                      <div className="action_btn_icon_post">
                        <FaEdit
                          onClick={() =>
                            (window.location.href = `/updateLearningProgress/${progress.id}`)
                          }
                          className="action_btn_icon"
                        />
                        <RiDeleteBin6Fill
                          onClick={() => handleDelete(progress.id)}
                          className="action_btn_icon"
                        />
                      </div>
                    )}
                  </div>
                  <div className="user_details_card_di">
                    <p className="card_post_title">{progress.title}</p>
                    <p
                      className="card_post_description"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {progress.description}
                    </p>
                  </div>
                  {progress.imageUrl && (
                    <div className="media-collage">
                      <div className="media-item">
                        <img
                          src={`http://localhost:8080/learningprogress/images/${progress.imageUrl}`}
                          alt="Learning Progress"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div
            className="add_new_btn"
            onClick={() => (window.location.href = "/addLearningProgress")}
          >
            <IoIosCreate className="add_new_btn_icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLearningProgress;
