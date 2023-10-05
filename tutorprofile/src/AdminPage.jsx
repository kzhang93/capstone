import React, { useState, useEffect } from 'react';
import {
  Button, Container, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar, Switch, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';

const AdminDashboard = () => {
  const [settings, setSettings] = useState({
    allowNewRegistrations: true,
    notificationsEnabled: true,
    maintenanceMode: false
  });

  const [users, setUsers] = useState([]);
  const [unitsOfStudy, setUnitsOfStudy] = useState([]);
  const [logs, setLogs] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [systemNotice, setSystemNotice] = useState('');
  const [displayMode, setDisplayMode] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchData('users', setUsers);
    fetchData('UnitsofStudy', setUnitsOfStudy);
    fetchData('logs', setLogs);
    fetchData('feedbacks', setFeedbacks);
  }, []);

  const fetchData = (endpoint, setState) => {
    fetch(`https://650d170ca8b42265ec2bace7.mockapi.io/${endpoint}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setState(data);
        } else {
          console.error(`Error fetching ${endpoint}: Data is not an array`);
          setState([]);
        }
      })
      .catch(error => {
        console.error(`Error fetching ${endpoint}:`, error);
        setState([]);
      });
  };

  const handleAdd = (endpoint) => {
    fetch(`https://650d170ca8b42265ec2bace7.mockapi.io/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
      .then(response => response.json())
      .then(data => {
        if (endpoint === 'users') {
          setUsers(prevUsers => [...prevUsers, data]);
        } else if (endpoint === 'UnitsofStudy') {
          setUnitsOfStudy(prevUnits => [...prevUnits, data]);
        }
        setDialogOpen(false);
      })
      .catch(error => console.error(`Error adding to ${endpoint}:`, error));
  };

  const handleDelete = (endpoint, id) => {
    fetch(`https://650d170ca8b42265ec2bace7.mockapi.io/${endpoint}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        if (endpoint === 'users') {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } else if (endpoint === 'UnitsofStudy') {
          setUnitsOfStudy(prevUnits => prevUnits.filter(unit => unit.id !== id));
        }
      })
      .catch(error => console.error(`Error deleting from ${endpoint}:`, error));
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditDialogOpen(true);
  };

  const handleUpdate = (endpoint) => {
    fetch(`https://650d170ca8b42265ec2bace7.mockapi.io/${endpoint}/${editItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editItem)
    })
      .then(response => response.json())
      .then(data => {
        if (endpoint === 'users') {
          setUsers(prevUsers => prevUsers.map(user => (user.id === data.id ? data : user)));
        } else if (endpoint === 'UnitsofStudy') {
          setUnitsOfStudy(prevUnits => prevUnits.map(unit => (unit.id === data.id ? data : unit)));
        }
        setEditDialogOpen(false);
      })
      .catch(error => console.error(`Error updating ${endpoint}:`, error));
  };

  const showUsers = () => {
    fetchData('users', setUsers);
    setDisplayMode('users');
  };

  const showUnitsOfStudy = () => {
    fetchData('UnitsofStudy', setUnitsOfStudy);
    setDisplayMode('UnitsofStudy');
  };


  return (
    <Container style={{ backgroundColor: 'pink', minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Administrative Dashboard</Typography>


      {/* User Management Section */}
      <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#e3f2fd' }}>
        <CardContent>
          <Typography variant="h6">User Management</Typography>
          <Button variant="contained" color="primary" onClick={showUsers}>View Users</Button>
          <Button variant="contained" color="secondary" onClick={() => { setDisplayMode('addUser'); setDialogOpen(true); }}>Add an User</Button>
          {displayMode === 'users' && (
            <List>
              {users.map(user => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <Button color="secondary" onClick={() => handleDelete('users', user.id)}>Delete</Button>
                  <Button color="primary" onClick={() => handleEdit(user)}>Edit</Button>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Units of Study Management */}
      <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#e1bee7' }}>
        <CardContent>
          <Typography variant="h6">Units of Study Management</Typography>
          <Button variant="contained" color="primary" onClick={showUnitsOfStudy}>View Units</Button>
          <Button variant="contained" color="secondary" onClick={() => { setDisplayMode('addUnitOfStudy'); setDialogOpen(true); }}>Add an Unit</Button>
          {displayMode === 'UnitsofStudy' && (
            <List>
              {unitsOfStudy.map(unit => (
                <ListItem key={unit.id}>
                  <ListItemText primary={unit.name} secondary={`Duration: ${unit.duration} hours, Topics: ${unit.topics}`} />
                  <Button color="secondary" onClick={() => handleDelete('UnitsofStudy', unit.id)}>Delete</Button>
                  <Button color="primary" onClick={() => handleEdit(unit)}>Edit</Button>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Logs Management */}
      <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#ffe0b2' }}>
        <CardContent>
          <Typography variant="h6">System Logs</Typography>
          <Button variant="contained" color="primary" onClick={() => setDisplayMode('logs')}>View Logs</Button>
          {displayMode === 'logs' && (
            <List>
              {logs.map(log => (
                <ListItem key={log.id}>
                  <ListItemText primary={log.action} secondary={new Date(log.timestamp).toLocaleString()} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Feedbacks Management */}
      <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#c8e6c9' }}>
        <CardContent>
          <Typography variant="h6">User Feedbacks</Typography>
          <Button variant="contained" color="primary" onClick={() => setDisplayMode('feedbacks')}>View Feedbacks</Button>
          {displayMode === 'feedbacks' && (
            <List>
              {feedbacks.map(feedback => (
                <ListItem key={feedback.id}>
                  <ListItemText primary={feedback.message} secondary={feedback.user} />
                  <Button color="secondary" onClick={() => handleDelete('feedbacks', feedback.id)}>Acknowledge</Button>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Add User/Unit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add {displayMode === 'addUser' ? 'User' : 'Unit'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
          />
          {displayMode === 'addUnitOfStudy' && (
            <>
              <TextField
                margin="dense"
                label="Duration"
                fullWidth
                onChange={(e) => setNewData({ ...newData, duration: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Topics"
                fullWidth
                onChange={(e) => setNewData({ ...newData, topics: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={() => handleAdd(displayMode === 'addUser' ? 'users' : 'UnitsofStudy')} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User/Unit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit {editItem && (editItem.hasOwnProperty('topics') ? 'Unit' : 'User')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editItem ? editItem.name : ''}
            onChange={(e) => setEditItem(prev => ({ ...prev, name: e.target.value }))}
          />
          {editItem && editItem.hasOwnProperty('topics') && (
            <>
              <TextField
                margin="dense"
                label="Duration"
                fullWidth
                value={editItem ? editItem.duration : ''}
                onChange={(e) => setEditItem(prev => ({ ...prev, duration: e.target.value }))}
              />
              <TextField
                margin="dense"
                label="Topics"
                fullWidth
                value={editItem ? editItem.topics : ''}
                onChange={(e) => setEditItem(prev => ({ ...prev, topics: e.target.value }))}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={() => handleUpdate(editItem && (editItem.hasOwnProperty('topics') ? 'UnitsofStudy' : 'users'))} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* System Notices */}
      <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#b2ebf2' }}>
        <CardContent>
          <Typography variant="h6">Post a System Notice</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={systemNotice}
            onChange={(e) => setSystemNotice(e.target.value)}
          />
          <Button color="primary" onClick={() => { alert(`Posted system notice: ${systemNotice}`); setSystemNotice(''); }} style={{ marginTop: '10px' }}>Post Notice</Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#d1c4e9' }}>
        <CardContent>
          <Typography variant="h6">System Settings</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Allow New Registrations" />
              <Switch
                checked={settings.allowNewRegistrations}
                onChange={() => setSettings(prev => ({ ...prev, allowNewRegistrations: !prev.allowNewRegistrations }))}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Notifications Enabled" />
              <Switch
                checked={settings.notificationsEnabled}
                onChange={() => setSettings(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }))}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Maintenance Mode" />
              <Switch
                checked={settings.maintenanceMode}
                onChange={() => setSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminDashboard;
