import React, { useState, useEffect } from "react";
import PostAnnouncementPage from "./PostAnnouncement";
import axios from "axios";

const Home = () => {
  const [announcementData, setAnnouncementData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/announcement");
        setAnnouncementData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnnouncementSubmit = (data) => {
    // Handle the submission logic if needed
    console.log("Announcement submitted:", data);

    // You may want to update the announcementData state here
    setAnnouncementData([...announcementData, data]);
  };

  return (
    <div>
      <PostAnnouncementPage onSubmit={handleAnnouncementSubmit} />
      {!loading && announcementData.length > 0 && (
        <div>
          <h2>Recent Announcements</h2>
          <ul>
            {announcementData.map((announcement, index) => (
              <li key={index}>
                <h3>{announcement.title}</h3>
                <p>{announcement.announcementText}</p>
                {/* Render other details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
