import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        let arr = localStorage.getItem('taskList');

        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(tempList));
        setTaskList(tempList);
    }

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem('taskList', JSON.stringify(tempList));
        setTaskList(tempList);
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem('taskList', JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    }

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    }

    return (
        <>
            <div className='header text-center mb-10'>
                <h3>Todo List</h3>
                <button className='btn btn-primary mt-2' onClick={() => setModal(true)}>Create Task</button>

                <div className='filter-buttons'>
                    <button className='btn btn-secondary' onClick={() => handleFilterChange('all')}>All</button>
                    <button className='btn btn-success' onClick={() => handleFilterChange('done')}>Done</button>
                    <button className='btn btn-danger' onClick={() => handleFilterChange('to do')}>To do</button>
                </div>
            </div>

            <div className='task-container'>
                {taskList &&
                    taskList.map((obj, index) => {
                        const isCompleted = obj.Done; // Проверка на Done
                        if (
                            (filterStatus === 'done' && isCompleted) ||
                            (filterStatus === 'to do' && !isCompleted) ||
                            filterStatus === 'all'
                        ) {
                            return (
                                <Card
                                    taskObj={obj}
                                    index={index}
                                    deleteTask={deleteTask}
                                    updateListArray={updateListArray}
                                />
                            );
                        }
                        return null;
                    })
                }
            </div>

            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;
