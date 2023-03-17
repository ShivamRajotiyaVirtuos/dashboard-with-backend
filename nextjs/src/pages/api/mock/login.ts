import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import axios from "axios";
import { useRouter } from "next/router";

const secret = "mysecretkey99";
const router = useRouter();
export default async function (
  req: { body?: any; cookies?: any },
  res: {
    setHeader: (arg0: string, arg1: string) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  }
) {
  const { email, password } = req.body;
  try {
    const response = await axios.post("http://localhost:4000/loginform", {
      email,
      password,
    });
    console.log("reach");
    console.log(response.data);
    router.push("/");
  } catch (error) {
    alert("Invalid Credentials");
    console.error(error);
  }

  if (email || password) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        email,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    const { cookies } = req;
    const jwt = cookies.OursiteJWT;
    console.log(jwt);

    res.status(200).json({ message: "Success!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
