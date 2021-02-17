import React from "react";
import { useSelector } from "react-redux";

const ProfileAvatar = () => {
  const userInfo = useSelector((state) => state.session.user);

  if (userInfo=== undefined || userInfo===null) {
    return <div></div>;
  } else {
    return (
      <div className="avatarContainer">
        <div className="profileAvatar">
          <img className="avatar-photo" src={userInfo.profileImageUrl} alt="imageProfile" />
        </div>
        <div className="welcome-back-text">Welcome back, {userInfo.firstName}!</div>
      </div>
    );
  }
};

export default ProfileAvatar