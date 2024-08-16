"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreateUser = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const createUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);
    setErrorMessage(null);

    const response = await fetch("/api/users/create", {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r)
      .catch((err) => err);

    const data = await response.json();

    if (data.errors) {
      setSubmitting(false);
      setErrors(data.errors);
    }

    if (data.errorMessage) {
      setSubmitting(false);
      setErrorMessage(data.errorMessage);
    }

    if (response.ok) {
      router.push("/users");
    }
  };

  return (
    <div className="px-5 w-full flex flex-col items-center">
      {errors?.name && (
        <span
          className="
  text-red-500 text-lg mt-2"
        >
          {errors?.name.message}
        </span>
      )}

      {errors?.email && (
        <span
          className="
  text-red-500 text-lg mt-2"
        >
          {errors?.email.message}
        </span>
      )}

      {errorMessage && (
        <span
          className="
  text-red-500 text-lg mt-2"
        >
          {errorMessage}
        </span>
      )}
      <h1 className="font-bold text-2xl">Create User</h1>
      <Form
        type="Create"
        user={user}
        setUser={setUser}
        submitting={submitting}
        handleSubmit={createUser}
      />
    </div>
  );
};

export default CreateUser;
