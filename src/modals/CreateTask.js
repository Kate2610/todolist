import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState({
    taskName: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedError = { ...error };

    if (name === 'taskName') {
      setTaskName(value);
      updatedError.taskName = value.trim() === '' ? 'Task Name is required' : '';
    } else if (name === 'description') {
      setDescription(value);
      updatedError.description = value.trim() === '' ? 'Description is required' : '';
    }

    setError(updatedError);
  }

  const handleSave = () => {
    if (taskName.trim() === '') {
      setError({ ...error, taskName: 'Task Name is required' });
      return;
    }

    if (description.trim() === '') {
      setError({ ...error, description: 'Description is required' });
      return;
    }

    let taskObj = {};
    taskObj["Name"] = taskName;
    taskObj["Description"] = description;
    save(taskObj);

    setTaskName('');
    setDescription('');
    setError({
      taskName: '',
      description: '',
    });
    toggle(); 
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create task</ModalHeader>
        <ModalBody>
          <form>
            <div className='form-group'>
              <label>Task Name</label>
              <input type='text' className='form-control' value={taskName} onChange={handleChange} name='taskName' />
              {error.taskName && <div className="text-danger">{error.taskName}</div>}
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea rows='5' className='form-control' value={description} onChange={handleChange} name='description'></textarea>
              {error.description && <div className="text-danger">{error.description}</div>}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Create
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateTask;
