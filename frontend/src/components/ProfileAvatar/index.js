import React from "react";
import { useSelector } from "react-redux";

const ProfileAvatar = () => {
  const userInfo = useSelector((state) => state.session.user);

  if (userInfo=== undefined ) {
    return <></>;
  } else {
    return (
      <>
        <div className="welcome-back-text">Welcome back, {userInfo.firstName}!</div>
        <div className="profileAvatar">
          <img className="avatar-photo" src={userInfo.profileImageUrl} alt="imageProfile" />
        </div>
      </>
    );
  }
};

export default ProfileAvatar