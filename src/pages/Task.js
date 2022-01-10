import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Task = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const state = useSelector((state) => state.changeSession);
  const [show, setShow] = useState(false);
  const buttons =['true','false']
  const[radioBtnValue,setRadioBtnValue] = useState()
  const [newTask, setNewTask] = useState({
    id: "",
    userId: "",
    title: "",
    completed: "",
  });
  const history = useHistory();
  // This function is checking the user authentication
  useEffect(() => {
    if (state) {
      if (!state.isLoggedIn) {
        history.push("/");
      }
    } else {
    }
  }, [state, history]);

  // This function is used to get the response from API
  useEffect(() => {
    if (data.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          setData(response.data);
          console.log(response.data)
          localStorage.setItem("data", JSON.stringify(response.data));
        }).catch((error)=>{
          console.log(error)
        });
    }
  }, []);

  // This function is used to delete the task form record
  const handleDelete = (id) => {
    saveData(data.filter((item) => item.id !== id));
  };

  // This function is used to add the task into record
  const addTask = (e) => {
    e.preventDefault();
    
    const newData = {...newTask,completed:radioBtnValue}
    setNewTask(newData)
    saveData([...data, newData]);
    setShow(false);
    setNewTask({
      id: "",
      userId: "",
      title: "",
      completed: "",
    });
  };

  // This funtion is used to save the record into the localStorage
  const saveData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    setData(data);
  };

  // This function is used to get the values of input onChange event
  const handleChange = (e) => {
    e.preventDefault();
    const data = { ...newTask };
    data[e.target.name] = e.target.value;
    setNewTask(data);
  };

  return (
    <div className="p-20">
      <table>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td className="td-border-bottom">{item.id}</td>
              <td className="td-border-bottom">{item.title}</td>
              <td className="td-border-bottom">
                {item.completed =='true' ? "True" : "False"}
              </td>
              <td>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {show ? (
        <div>
          <input
            type="number"
            name="id"
            value={newTask.id}
            placeholder="Id"
            onChange={handleChange}
            className="input-tag"
          />
          <input
            type="number"
            name="userId"
            value={newTask.userId}
            placeholder="UserId"
            onChange={handleChange}
            className="input-tag"
          />
          <input
            type="text"
            name="title"
            value={newTask.title}
            placeholder="Title"
            onChange={handleChange}
            className="input-tag"
          />
          Completed
          {buttons.map((btn,index)=>(
            <div key={index} className='d-flex'>
            <input type="radio" name="completed" value={btn} onChange={(e)=>setRadioBtnValue(e.target.value)}/>
            {btn}
            </div>
          ))}

          <h1>{radioBtnValue}</h1>
          
          {/* True
          <input type="radio" name="completed" value="False" onChange={handleChange}/>
          False */}
          <div className="d-flex">
            <button type="submit" className="submit-btn" onClick={addTask}>
              Submit
            </button>
            <button
              type="submit"
              className="cancel-btn"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        type="button"
        className="add-task-btn"
        onClick={(e) => setShow(true)}
      >
        Add Task
      </button>
    </div>
  );
};

export default Task;
