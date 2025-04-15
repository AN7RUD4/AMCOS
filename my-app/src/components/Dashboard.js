import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data - in a real app, this would come from an API
  const stats = [
    { title: 'Active Projects', value: 8, icon: 'fa-building', color: 'blue' },
    { title: 'Workers', value: 24, icon: 'fa-hard-hat', color: 'orange' },
    { title: 'Pending Quotations', value: 3, icon: 'fa-file-invoice', color: 'red' },
    { title: 'Completed Projects', value: 15, icon: 'fa-check-circle', color: 'green' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Quotation #1234 sent to ABC Corp', time: '2 hours ago' },
    { id: 2, activity: 'Worker Ahmed Ali added to Project X', time: '5 hours ago' },
    { id: 3, activity: 'Materials delivered to Site B', time: '1 day ago' },
    { id: 4, activity: 'Project Y completed successfully', time: '2 days ago' },
  ];

  return (
    <div className="dashboard">
      <h2>Company Overview</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul>
            {recentActivities.map(activity => (
              <li key={activity.id}>
                <p>{activity.activity}</p>
                <span className="time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="upcoming-tasks">
          <h3>Upcoming Tasks</h3>
          <div className="task">
            <input type="checkbox" id="task1" />
            <label htmlFor="task1">Follow up with XYZ Client on quotation</label>
          </div>
          <div className="task">
            <input type="checkbox" id="task2" />
            <label htmlFor="task2">Schedule worker training session</label>
          </div>
          <div className="task">
            <input type="checkbox" id="task3" />
            <label htmlFor="task3">Order materials for Project A</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;