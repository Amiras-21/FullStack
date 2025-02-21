"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TextField, Button, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import styles from "./todo.module.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (typeof window !== "undefined") { 
  //     const token = localStorage.getItem("token");
  //     const key = localStorage.getItem("key");

  //     if (!token || !key) {
  //       router.push("/login");
  //     }
  //   }
  // }, [pathname]);

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return cookies[name] || null;
  };

  
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = getCookie("tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (tasks.length === 0) {
        deleteCookie("tasks"); 
      } else {
        setCookie("tasks", JSON.stringify(tasks), 7);
      }
    }
  }, [tasks]);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const addTask = () => {
    if (task.trim() !== "") {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveEditedTask = () => {
    if (editedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = editedTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTask("");
    }
  };

  return (
    <div className={styles.mainContainer}>
    <div className={styles.todoContainer}>
      <h1>To-Do List</h1>
      <div className={styles.inputContainer}>
        <TextField
          label="Enter a new task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={styles.inputField}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          className={styles.addButton}
        >
          Add Task
        </Button>
      </div>

      {editingIndex !== null && (
        <div className={styles.inputContainer}>
          <TextField
            label="Edit Task"
            variant="outlined"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className={styles.inputField}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={saveEditedTask}
            className={styles.addButton}
          >
            Save
          </Button>
        </div>
      )}

      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            <span>{task}</span>
            <div>
              <IconButton
                color="primary"
                onClick={() => editTask(index)}
                style={{ marginRight: "10px" }}
              >
                <Edit />
              </IconButton>
              <IconButton color="secondary" onClick={() => deleteTask(index)}>
                <Delete />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Todo;
