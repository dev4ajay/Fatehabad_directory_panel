import axios from "axios";
import React from "react";
import { useState } from "react";
import { AdminUrl } from "../BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(AdminUrl + "/login", {
        email,
        password,
      });
      console.log("Login successful!", response.data);
      if (response.data.status === true) {
        toast.success("Login Successfully");
        navigate("/Dashboard");
        localStorage.setItem("accessToken", response.data.token);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data.error);
      }
      console.error("Login failed", error);
    }
  };
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2 class="text-center text-dark mt-5">Welcome to Admin Login </h2>
          <div class="card my-5 mt-3">
            <form
              class="card-body cardbody-color p-lg-3"
              onSubmit={handleSubmit}
            >
              <div class="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="100px"
                  alt="profile"
                />
              </div>

              <div class="mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Id"
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
