import ProjectContext from "./Contexts";
import React, { useState } from "react";
 const path_to_backend = process.env.REACT_APP_BACKEND_URL;
export default function Project_states(props) {
  var dt;
  const [Employee,setEmployees] = useState(null);
  const fetchDataFromBackend = async () => {
    try {
        console.log("IS called")
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
        dt=data.message;
        console.log(data.message);
       setTimeout(()=>{

           setEmployees(data.message);

       },1000)
       
      } else {
        // showAlert("Failed to fetch data from the backend", "error");
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    //   showAlert("An error occurred while fetching data", "error");
    }
  };
  const UpdateData = async (data,index) => {
    //  var bd= {index,data};
    try {
        console.log("IS called")
      const response = await fetch(`${path_to_backend}/updateemployee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify( {index,name:data.name , age:data.age,dob:data.dob,salary:data.salary,department:data.department} ),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dt=data.message;
        console.log(data.message);
       setTimeout(()=>{
// 
           setEmployees(data.message);
       },1000)
       fetchDataFromBackend();
      } else {
        // showAlert("Failed to fetch data from the backend", "error");
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    //   showAlert("An error occurred while fetching data", "error");
    }
  };
  const DeleteData = async (index) => {
    //  var bd= {index,data};
    try {
        console.log("IS called")
      const response = await fetch(`${path_to_backend}/deleteemployee/${index}`, {
        method: "Delete",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // body:JSON.stringify( {index} ),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dt=data.message;
        console.log(data.message);
       setTimeout(()=>{

           setEmployees(data.message);
       },1000)
       fetchDataFromBackend();
      } else {
        // showAlert("Failed to fetch data from the backend", "error");
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    //   showAlert("An error occurred while fetching data", "error");
    }
  };
  const InsertData = async (data) => {
    //  var bd= {index,data};
    try {
        console.log(data)
      const response = await fetch(`${path_to_backend}/addemployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify( {data} ),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dt=data.message;
        console.log(data.message);
       setTimeout(()=>{

           setEmployees(data.message);
       },1000)
       fetchDataFromBackend();
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
        InsertData
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}

