import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
  // State management
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [file, setFile] = useState();
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate login data
    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };
    console.log("Login Data:", loginData);

    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      // Update errors state
      setLoginErrors(result.error.formErrors.fieldErrors);
      // console.error("Validation errors:", result.error.errors);
      return;
    }
    // Clear previous errors
    setLoginErrors({});

    // Send data to the backend
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("Login response:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate signup data
    const signupData = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
    };

    const result = signupSchema.safeParse(signupData);
    if (!result.success) {
      // Update errors state
      setSignupErrors(result.error.formErrors.fieldErrors);
      console.error("Validation errors:", result.error.errors);
      return;
    }
    // Clear previous errors
    setSignupErrors({});

    // Send data to the backend
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("Signup response:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="flex justify-center items-center">
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  {loginErrors.email && (
                    <div className="text-red-500 text-sm">
                      {loginErrors.email}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  {loginErrors.password && (
                    <div className="text-red-500 text-sm">
                      {loginErrors.password}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="SignUp">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>New Account</CardTitle>
              <CardDescription>Create a new account</CardDescription>
              <Avatar className="h-16 w-16">
                <AvatarImage src={file} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Input type="file" onChange={handleChange} />
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                  {signupErrors.name && (
                    <div className="text-red-500 text-sm">
                      {signupErrors.name}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  {signupErrors.email && (
                    <div className="text-red-500 text-sm">
                      {signupErrors.email}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                  {signupErrors.password && (
                    <div className="text-red-500 text-sm">
                      {signupErrors.password}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">SignUp</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
