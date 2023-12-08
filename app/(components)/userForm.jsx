'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formData),
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="d-flex flex-column w-1/2 col-lg-3 align-items-center justify-content-center"

      >
        <h1>Create New User</h1>
        <label>Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="m-2 bg-slate rounded"
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="m-2 bg-slate rounded"
        />
          <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="m-2 bg-slate rounded"
        />
        <button className="bg-info rounded-4">Create User</button>
      </form>
      <p className="text-error">{errorMessage}</p>
    </div>
  );
};

export default UserForm;
