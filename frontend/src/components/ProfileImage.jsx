import { useState } from "react";

export default function ProfileImage({ profileImage, setProfileImage, selectedFile, setSelectedFile }) {
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    //preview local {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  

  return (
    <div className="profile-header">
      <img src={profileImage} alt="Foto de perfil" className="profile-photo" />
      <label htmlFor="file-input" className="btn-edit-photo">
        Subir nueva foto
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );

}