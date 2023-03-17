import React, { useState } from "react";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import headerlogo from "./images/book-my-time-logo.svg";
import bodyimg from "./images/book-my-time-img.svg";
import virtuoslogo from "./images/virtuos-virtuez-logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string | number>("");
  const [name, setName] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const router = useRouter();
  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/registerform', {
        name,
        email,
        password,
      });
    router.push('/login');
      
    } catch (error) {
      console.error(error);
    }

    console.log(email, name, password);
    setEmail("");
    setPassword("");
    setName("");

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
            <h2>Register </h2>
          </div>
          <div className="form1">
            <form onSubmit={handleSubmit} className="form">
              <div className="text-field">
                <Form.Control
                  style={{ width: "250px" }}
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="text-field">
                <Form.Control
                  style={{ width: "250px" }}
                  type="email"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div className="text-field">
                <Form.Control
                  style={{ width: "250px" }}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your Password"
                  required
                />
              </div>

              <Button
                type="submit"
                style={{ borderRadius: "50px", backgroundColor: "#00a2fe" }}
                variant="primary"
              >
                Register
              </Button>
            </form>
            <div>
              <Link
                style={{ textDecoration: "none", color: "#00a2fe" }}
                href="/login"
              >
                Have an account? Log In.
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

export default Register;
