import { useState } from "react";
import axios from "axios";
import "./createRepo.css";

export default function CreateRepo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true); // true = public

  const owner = localStorage.getItem("userId"); // stored after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/repos/create", {
        name,
        description,
        visibility,
        owner,
      });

      alert("Repository Created!");
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Error creating repo");
    }
  };

  return (
    <div className="create-repo-wrapper">
      <div className="repo-card">
        <h2>Create New Repository</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Repository Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="visibility-box">
            <label>
              <input
                type="radio"
                checked={visibility === true}
                onChange={() => setVisibility(true)}
              />
              Public
            </label>

            <label>
              <input
                type="radio"
                checked={visibility === false}
                onChange={() => setVisibility(false)}
              />
              Private
            </label>
          </div>

          <button type="submit">Create Repository</button>
        </form>
      </div>
    </div>
  );
}
