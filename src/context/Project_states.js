import ProjectContext from "./Contexts";
import React, { useState } from "react";
const path_to_backend = process.env.REACT_APP_BACKEND_URL;
export default function Project_states(props) {
  var dt;
  const [Employee, setEmployees] = useState(null);
  const fetchDataFromBackend = async () => {
    try {
      console.log("IS called");
      const response = await fetch(`${path_to_backend}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dt = data.message;
        console.log(data.message);
        setEmployees(data.message);
      } else {
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const UpdateData = async (data, index) => {
    try {
      console.log("IS called");
      const response = await fetch(`${path_to_backend}updateemployee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          index,
          firstname: data.firstname,
          lastname: data.lastname,
          age: data.age,
          dob: data.dob,
          salary: data.salary,
          department: data.department,
        }),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dt = data.message;
        console.log(data.message);

        setEmployees(data.message);
      } else {
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const DeleteData = async (index) => {
    console.log(index);
    try {
      console.log("IS called");
      const response = await fetch(
        `${path_to_backend}deleteemployee/${index}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dt = data.message;
        console.log(data.message);

        setEmployees(data.message);
      } else {
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const InsertData = async (data) => {
    try {
      console.log(data);
      const response = await fetch(`${path_to_backend}addemployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ data }),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dt = data.message;
        console.log(data.message);
        setEmployees(data.message);
      } else {
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        fetchDataFromBackend,
        Employee,
        setEmployees,
        UpdateData,
        DeleteData,
        InsertData,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}
