import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoApi } from '../../api';
import Context from './index';

const TodoProvider = (props: any) => {
  const [allTodos, setAllTodo] = useState<any>([]);
  const [todoItem, setTodoItem] = useState<any>([]);

  const fetchTodo = async () => {
    try {
      await axios.get(`${TodoApi}`).then((resp) => {
        setAllTodo(resp.data);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [setAllTodo, setTodoItem]);

  const addNewTodo = (tasks: any) => {
    const temp = {
      id: allTodos.length + 1,
      title: tasks.task,
      status: 'pending',
    };
    setAllTodo([...allTodos, temp]);
    setTodoItem([...allTodos, temp]);
  };

  const selectItem = (id: string, status: any) => {
    const temp = allTodos.reduce((todoAcc: any, item: any) => {
      if (item.id === id) {
        todoAcc.push({ ...item, status: status });
      } else todoAcc.push(item);
      return todoAcc;
    }, []);

    setTodoItem(temp);
    setAllTodo(temp);
  };

  const markAllItems = (markAll: any) => {
    const updateStatus = allTodos.reduce((cartAcc: any, item: any) => {
      if (markAll === false) {
        cartAcc.push({ ...item, status: 'completed' });
      } else {
        cartAcc.push({ ...item, status: 'pending' });
      }
      return cartAcc;
    }, []);
    updateStatus.map((todo: any) => {
      return axios.put(`${TodoApi}/${todo.id}`, todo);
    });
    setAllTodo(updateStatus);
    setTodoItem(updateStatus);
  };

  const removeItems = (id: string) => {
    // const updatedItems = allTodos.reduce((cartAcc, item) => {
    //   if (item.id === id) {
    //     cartAcc.push({ ...item, isStatus: 'deleted' })
    //   } else {
    //     cartAcc.push(item)
    //   }
    //   return cartAcc;
    // }, []);
    setAllTodo(allTodos.filter((data: any) => data.id !== id));
    // setTodoItem(data);
    // setAllTodo(data);
    // fetchTodo();
  };

  return (
    <Context.Provider
      value={{
        ...props,
        allTodos,
        todoItem,
        addNewTodo: addNewTodo,
        selectedItem: selectItem,
        markAllItems: markAllItems,
        removeItems: removeItems,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default TodoProvider;
