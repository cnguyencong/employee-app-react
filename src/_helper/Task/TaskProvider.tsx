import React, { useEffect, useState } from 'react';
import Context from './index';
import axios from 'axios';
import { TaskApi } from '../../api';

const TaskProvider = (props: any) => {
    const [allTask, setAllTask] = useState<any>([]);
    const [newTask, setNewTask] = useState([]);

    const getTask = async () => {
        try {
            await axios.get(TaskApi).then((resp) => {
                setAllTask(resp.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getTask();
    }, [setAllTask, setNewTask]);

    const AddNewTask = (data: any) => {
        const taskTemp = {
            id: allTask.length + 1,
            title: data.title,
            collection: data.collection,
            desc: data.desc,
        };
        setAllTask([...allTask, taskTemp]);
    };

    const RemoveTask = (id: string) => {
        setAllTask(allTask.filter((data: any) => data.id !== id));
    };

    return (
        <Context.Provider
            value={{
                ...props,
                allTask,
                newTask,
                AddNewTask: AddNewTask,
                RemoveTask: RemoveTask
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default TaskProvider;