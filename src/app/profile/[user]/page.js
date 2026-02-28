"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProfile() {
  const { user: userId } = useParams();
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: "",
  });

  //   const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.statusText}`);
        }
        const data = await res.json();
        if (!data?.user) {
          throw new Error(`Failed to fetch user data: ${res.statusText}`);
        }
        setUser(data.user);
        if (data?.profilePicture) {
          setImagePreview(data.profilePicture);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
        router.back(); // Redirect to the previous page on error
      } finally {
        // setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value.trim() });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Generate image preview
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImagePreview(fileReader.result);
    };
    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    })) {
      if (!value) {
        alert(`${key} is required !`);
        return;
      }
    }
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Profile Updated Successfully");
        router.back();
      } else {
        alert("Failed to update profile");
        router.back();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  //   if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid gap-6">
          <div className="flex flex-col items-center">
            {/* <label
              className="text-gray-700 font-medium mb-2"
              htmlFor="profilePicture"
            >
              Profile Picture
            </label>
            <div className="w-32 h-32 mb-4 border rounded-full overflow-hidden">
              <img
                src={imagePreview}
                alt="Profile Picture Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            /> */}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user?.firstName}
              onChange={handleChange}
              className="p-2 border rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user?.lastName}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email}
              onChange={handleChange}
              className="p-2 border rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user?.phone}
              onChange={handleChange}
              className="p-2 border rounded-md"
              required
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
