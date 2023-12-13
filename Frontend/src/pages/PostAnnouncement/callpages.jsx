import React, { useState } from "react";
import PostAnnouncementPage from "./PostAnnouncement";
import AnnouncementDisplayPage from "./AnnouncementDisplayPage";

function Callpages() {
  const [displayAnnouncementPage, setDisplayAnnouncementPage] = useState(false);
  const [announcementData, setAnnouncementData] = useState({});

  const handleSubmit = (data) => {
    setAnnouncementData(data);
    setDisplayAnnouncementPage(true);
  };
  return (
    <div>
      {!displayAnnouncementPage && (
        <PostAnnouncementPage onSubmit={handleSubmit} />
      )}

      {displayAnnouncementPage && (
        <AnnouncementDisplayPage announcementData={announcementData} />
      )}
    </div>
  );
}

export default Callpages;
