import React, { useState, useEffect } from 'react';
import './WorkerManagement.css';

const WorkerManagement = () => {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({
    name: '',
    position: 'Laborer',
    idNumber: '',
    phone: '',
    salary: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load sample data (in a real app, this would come from an API)
  useEffect(() => {
    const sampleWorkers = [
      { id: 1, name: 'Ahmed Ali', position: 'Foreman', idNumber: '1234567890', phone: '0551234567', salary: 4500, joinDate: '2022-01-15', status: 'Active' },
      { id: 2, name: 'Mohammed Hassan', position: 'Mason', idNumber: '2345678901', phone: '0552345678', salary: 3500, joinDate: '2022-03-20', status: 'Active' },
      { id: 3, name: 'Yousef Ahmed', position: 'Carpenter', idNumber: '3456789012', phone: '0553456789', salary: 3800, joinDate: '2022-05-10', status: 'On Leave' },
      { id: 4, name: 'Khalid Omar', position: 'Electrician', idNumber: '4567890123', phone: '0554567890', salary: 4000, joinDate: '2022-07-05', status: 'Active' },
    ];
    setWorkers(sampleWorkers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker(prev => ({ ...prev, [name]: value }));
  };

  const addWorker = () => {
    if (editingId) {
      // Update existing worker
      setWorkers(workers.map(worker => 
        worker.id === editingId ? { ...newWorker, id: editingId } : worker
      ));
      setEditingId(null);
    } else {
      // Add new worker
      const id = workers.length > 0 ? Math.max(...workers.map(w => w.id)) + 1 : 1;
      setWorkers([...workers, { ...newWorker, id }]);
    }
    setNewWorker({
      name: '',
      position: 'Laborer',
      idNumber: '',
      phone: '',
      salary: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
  };

  const editWorker = (worker) => {
    setNewWorker(worker);
    setEditingId(worker.id);
  };

  const deleteWorker = (id) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.idNumber.includes(searchTerm)
  );

  return (
    <div className="worker-management">
      <h2>Worker Management</h2>
      
      <div className="worker-form">
        <h3>{editingId ? 'Edit Worker' : 'Add New Worker'}</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={newWorker.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <select 
              name="position" 
              value={newWorker.position} 
              onChange={handleInputChange}
            >
              <option value="Laborer">Laborer</option>
              <option value="Mason">Mason</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Foreman">Foreman</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Driver">Driver</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>ID Number</label>
            <input 
              type="text" 
              name="idNumber" 
              value={newWorker.idNumber} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={newWorker.phone} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Monthly Salary (SAR)</label>
            <input 
              type="number" 
              name="salary" 
              value={newWorker.salary} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Join Date</label>
            <input 
              type="date" 
              name="joinDate" 
              value={newWorker.joinDate} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select 
              name="status" 
              value={newWorker.status} 
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <button onClick={addWorker} className="add-worker-btn">
              {editingId ? 'Update Worker' : 'Add Worker'}
            </button>
            {editingId && (
              <button 
                onClick={() => {
                  setEditingId(null);
                  setNewWorker({
                    name: '',
                    position: 'Laborer',
                    idNumber: '',
                    phone: '',
                    salary: '',
                    joinDate: new Date().toISOString().split('T')[0],
                    status: 'Active'
                  });
                }} 
                className="cancel-edit-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="worker-list">
        <div className="list-header">
          <h3>Worker List</h3>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search workers..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Salary (SAR)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map(worker => (
                <tr key={worker.id} className={`status-${worker.status.toLowerCase().replace(' ', '-')}`}>
                  <td>{worker.idNumber}</td>
                  <td>{worker.name}</td>
                  <td>{worker.position}</td>
                  <td>{worker.phone}</td>
                  <td>{worker.salary}</td>
                  <td>
                    <span className={`status-badge ${worker.status.toLowerCase().replace(' ', '-')}`}>
                      {worker.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => editWorker(worker)} className="edit-btn">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => deleteWorker(worker.id)} className="delete-btn">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-workers">No workers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="worker-stats">
        <div className="stat-card">
          <h4>Total Workers</h4>
          <p>{workers.length}</p>
        </div>
        <div className="stat-card">
          <h4>Active Workers</h4>
          <p>{workers.filter(w => w.status === 'Active').length}</p>
        </div>
        <div className="stat-card">
          <h4>Monthly Salary Total</h4>
          <p>{workers.reduce((sum, worker) => sum + (parseFloat(worker.salary) || 0, 0))} SAR</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerManagement;