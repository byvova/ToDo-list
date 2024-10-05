import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecord, toggleStatus, filterByType } from './redux/actions';

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const records = useSelector(state => state.records);
    const filterType = useSelector(state => state.filterType);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddRecord = () => {
        if (inputValue.length <= N) {
            dispatch(addRecord(inputValue));
            setInputValue('');
        } else {
            alert(`Record length must be less than or equal to ${N} characters.`);
        }
    };

    const handleToggleStatus = (id) => {
        dispatch(toggleStatus(id));
    };

    const handleFilterByType = (type) => {
        dispatch(filterByType(type));
    };

    const renderRecords = () => {
        let filteredRecords = records;

        if (filterType === 'completed') {
            filteredRecords = records.filter(record => record.completed);
        } else if (filterType === 'current') {
            filteredRecords = records.filter(record => !record.completed);
        }

        return filteredRecords.map(record => (
            <div
                key={record.id}
                onClick={() => handleToggleStatus(record.id)}
                className={record.completed ? 'completed' : 'not-completed'}
            >
                {record.text}
            </div>
        ));
    };

    const countCompletedTasks = () => {
        return records.filter(record => record.completed).length;
    };

    const countUncompletedTasks = () => {
        return records.filter(record => !record.completed).length;
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter new record"
            />
            <button onClick={handleAddRecord}>Add</button>

            <div>
                <button onClick={() => handleFilterByType('all')}>All</button>
                <button onClick={() => handleFilterByType('completed')}>Completed</button>
                <button onClick={() => handleFilterByType('current')}>Current</button>
            </div>

            <div>
                <p>Completed: {countCompletedTasks()}</p>
                <p>Uncompleted: {countUncompletedTasks()}</p>
            </div>

            <div>
                {renderRecords()}
            </div>
        </div>
    );
};

export default ToDoList;
