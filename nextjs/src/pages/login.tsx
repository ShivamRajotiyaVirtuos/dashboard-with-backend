import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import bodyimg from "./images/book-my-time-img.svg";
import virtuoslogo from "./images/virtuos-virtuez-logo.svg";
import headerlogo from "./images/book-my-time-logo.svg";
import Link from "next/link";

const Loginform: React.FC = () => {
  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("click submit")

    try {
      const response = await axios.post("http://localhost:4000/loginform", {
        email,
        password,
      });
      console.log("reach");
      console.log(response);
      if(response.status === 200){
        router.push("/");
console.log("logged in");
      }
    } catch (error) {
      alert("Invalid Credentials");
      console.error(error);
    }
    

    // const credentials = { email, password };

    // const user = await axios.post("/api/mock/login", credentials);

    // console.log(user);
    // setEmail("");
    // setPassword("");
    // // router.push("/");

    // if (user.status === 200) {
    //   // Cookies.set("Set-Cookie", "true");
    //   console.log("logged in");
    //   router.push("/");
    // }
  };

  return (
    <div className="main-form">
      <div className="header-form">
        <Image src={headerlogo} alt="bookmytime-logo" />
      </div>

      <div className="body-form">
        <div className="byt-img">
          <Image src={bodyimg} alt="bookmytime-img" />
        </div>

        <div className="container-form">
          <div>
            <h2>Welcome</h2>
          </div>
          <div className="form1">
            <form onSubmit={handleSubmit} className="form">
              <div className="text-field">
                <Form.Control
                  style={{ width: "250px" }}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  // id="outlined-basic"
                  placeholder="Enter your Email"
                  // variant="outlined"
                  value={email}
                  required
                />
              </div>

              <div className="text-field">
                <Form.Control
                  style={{ width: "250px" }}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  // id="outlined-basic"
                  placeholder="Enter your Password"
                  // variant="outlined"
                  value={password}
                  required
                />
              </div>

              <Button
                type="submit"
                style={{ borderRadius: "50px", backgroundColor: "#00a2fe" }}
                variant="primary"
              >
                Login
              </Button>
            </form>
            <div>
              <Link
                style={{ textDecoration: "none", color: "#00a2fe" }}
                href="/register"
              >
                Dont have an account? Register.
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="v-logo">
          <Image src={virtuoslogo} alt="Virtuos-Logo" />
        </div>
        <div className="copy">
          © Virtuos Digital Ltd. Virtuez Assimilations. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Loginform;
