"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })
        .then((r) => r)
        .catch((error) => console.error(error));

      const data = await response.json();

      if (data) {
        if (data.success) {
          setSuccess(data.success);
          getUsers();
          setInterval(() => {
            setSuccess("");
          }, 2000);
        }
      }
      // const updatedUsers = users.filter((user) => user._id !== id);
      // setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-5 w-full">
      <h1 className="text-center font-bold text-2xl">Users List</h1>

      {success && (
        <div className="text-center text-lg mt-4 text-green-500 dark:text-green-400">
          {success}
        </div>
      )}

      <div className="relative overflow-x-auto mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-5 text-emerald-950 text-xl"
                >
                  Loading...
                </td>
              </tr>
            )}

            {!loading && !users.length && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-5 text-emerald-950 text-xl"
                >
                  No users found
                </td>
              </tr>
            )}

            {!loading &&
              users &&
              users.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-center">{user.name}</td>
                  <td className="px-6 py-4 text-center">{user.email}</td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/users/edit/${user._id}`}
                      className="text-sm font-medium text-blue-700 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/users/delete/${user._id}`}
                      className="ml-4 text-sm font-medium text-red-700 hover:text-red-500 dark:text-red-300 dark:hover:text-red-200"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?"
                          )
                        ) {
                          deleteUser(user._id);
                        }
                      }}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
