import React, { useContext, useEffect, useState,useRef } from "react";
import ProjectContext from "../context/Contexts";
import "./Crud.css";
export default function Landing_page() {
  const context = useContext(ProjectContext);

  const {
    fetchDataFromBackend,
    Employee,
    UpdateData,
    DeleteData,
    InsertData,
    setEmployees,
  } = context;
  const [newEmployee, setNewEmployee] = useState({});
  const [updatestate, setUpdatestate] = useState(-1);
  const [updateddata, setupdateddata] = useState({});
  const [search, setsearch] = useState(null);
  const [searcharr, setsearchdata] = useState(null);
  const searchref= useRef();
  const onclickhandle = (ele, index) => {
    console.log(ele);
    UpdateData(ele, index);
  };
  const onclickDelete = (index) => {
    console.log("On Click Delete");
    DeleteData(index);
  };
  const onchangehandle = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const onclickAdd = () => {
    InsertData(newEmployee);
  };
  function handleEdit(name) {
    setUpdatestate(name);
  }
  function handleInput(e) {
    // e.preventDefault()
    console.log(e.target.value);
    setupdateddata({ ...updateddata, [e.target.name]: e.target.value });
    console.log(updateddata);

    // let name= updateddata.name.split(' ');
    // console.log(name);
  }

  function EditList({ item, ind, Employee, setEmployees }) {
    return (
      <tr>
        <td>
          {" "}
          Name{" "}
          <input
            type="text"
            name="name"
            id=""
            value={updateddata.name}
            onChange={handleInput}
          />
        </td>
        <td>
          {" "}
          Age:{" "}
          <input
            type="number"
            name="age"
            id=""
            value={updateddata.age}
            onChange={handleInput}
          />
        </td>
        <td>
          {" "}
          DOB{" "}
          <input
            type="date"
            name="dob"
            id=""
            value={updateddata.dob}
            onChange={handleInput}
          />
        </td>
        <td>
          {" "}
          Salary{" "}
          <input
            type="number"
            name="salary"
            id=""
            value={updateddata.salary}
            onChange={handleInput}
          />
        </td>
        <td>
          {" "}
          department{" "}
          <input
            type="text"
            name="department"
            id=""
            value={updateddata.department}
            onChange={handleInput}
          />
        </td>
        <td>
          <button type="submit" onSubmit={handlesubmit}>
            {" "}
            Update
          </button>
        </td>
      </tr>
    );
  }
  function handlesubmit(e) {
    e.preventDefault();
    setupdateddata({ ...updateddata, [e.target.name]: e.target.value });
    // let name= updateddata.name.split(' ');
    // console.log(name);
    // const newList = Employee.map((item1,index)=>{
    //   return index == updatestate ? {...item1,[0]:name[0],[1]:name[1],[2]:updateddata.age,[3]:updateddata.dob,[4]:updateddata.salary,[5]:updateddata.department} :item1
    // })
    // setEmployees(newList);

    // console.log(newList);
    UpdateData(updateddata, updatestate);
    setUpdatestate(-1);
  }
  function handlesearchchange(e){
    console.log(e.target.value)
        setsearch(e.target.value);
  }
  function searchdata(){
      //  var val = document.getElementById('searchinput').value();
      var val = searchref.current.value;
       console.log(val);
       var ind;
       if(search=='Age'){
        ind=2;
       }else if(search=='Name'){
        ind=0;
       }else if(search=='Salary'){
        ind=4;
       }
       else{
        ind=5;
       }
       const newdata = Employee.map((item,index)=>{
        return item[ind]==val ? item :null
       })
       console.log(newdata);
       setsearchdata(newdata);
  }

  useEffect(() => {
    fetchDataFromBackend();
    console.log(Employee);
  }, []);

  return (
    <>
      <div style={{ display: "flex", maxWidth: "100%", flexWrap: "wrap" }}>
        
          <div className="searchbar">
         <h2 style={{display:'inline'}}>Search</h2>      <select onChange={handlesearchchange} name="search" id=""> 
               <option value="Name" >By Name</option>
               <option value="Age">By Age</option>
               <option value="Salary">By Salary</option>
               <option value="Department">By Department</option>
             </select>
             {search && <div> 
              <input type="text" id="searchinput" ref={searchref} /> 
              <button type="button" className="button" onClick={()=>searchdata()}>Search</button>
             </div>  }
             <table>
             {searcharr && searcharr.map((item,index)=>{
               return  item!=null && <tr>
               <td>{item[0] + " " + item[1]}</td>
               <td>{item[2]}</td>
               <td>{item[3]}</td>
               <td>{item[4]}</td>
               <td>{item[5]}</td>
               {/* <td>{index}</td> */}
             
             </tr>
             })}
             </table>
          </div>
        <div className="addemployee">
          <h3>Add New Employee : </h3>
      <form action="" method="post" class="card" />
      Name{" "}
      <input
        type="text"
        name="name"
        id=""
        value={newEmployee.name}
        onChange={onchangehandle}
      />
      Age:{" "}
      <input
        type="number"
        name="age"
        id=""
        value={newEmployee.age}
        onChange={onchangehandle}
      />
      DOB{" "}
      <input
        type="date"
        name="dob"
        id=""
        value={newEmployee.dob}
        onChange={onchangehandle}
      />
      Salary{" "}
      <input
        type="number"
        name="salary"
        id=""
        value={newEmployee.salary}
        onChange={onchangehandle}
      />
      department{" "}
      <input
        type="text"
        name="department"
        id=""
        value={newEmployee.department}
        onChange={onchangehandle}
      />
      <button className="button"
        onClick={() => {
          return onclickAdd();
        }}
      >
        {" "}
        Submit{" "}
      </button>
      </div>
          <div className="crud">
          <h1> Employees details </h1>
          <br/>
          <form onSubmit={handlesubmit} action="">
            <table>
              <tr>
                <td>Name</td>
                <td>Age</td>
                <td>DOB</td>
                <td>Salary</td>
                <td>Department</td>
              </tr>

              {Employee &&
                Employee.map((item, index) => {
                  return updatestate === index ? (
                    <EditList
                      item={item}
                      index={index}
                      Employee={Employee}
                      setEmployees={setEmployees}
                    />
                  ) : (
                    <tr>
                      <td>{item[0] + " " + item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      {/* <td>{index}</td> */}
                      <td>
                        <button
                          className="edit"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => onclickDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </form>
        </div>
      </div>
      <br />
    
    </>
  );
}
