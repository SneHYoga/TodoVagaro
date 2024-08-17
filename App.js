import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Grid, Button, Typography, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const theme = createTheme();

export default function App() {
	const [open, setOpen] = useState(false);
	const [taskName, setTaskName] = useState('');
	const [assignedTo, setAssignedTo] = useState('');
	const [projectName, setProjectName] = useState('');
	const [status, setStatus] = useState('');
	const [filterBy, setFilterBy] = useState('All');
	const [tasks, setTasks] = useState([]);

	const handleClose = () => {
		setOpen(false);
		setTaskName('');
		setAssignedTo('');
		setProjectName('');
		setStatus('');
	};

	const handleSave = () => {
		const newTask = {
			taskName,
			assignedTo,
			projectName,
			status,
		};
		setTasks(prevTasks => [...prevTasks, newTask]);
		setTaskName('');
		setAssignedTo('');
		setProjectName('');
		setStatus('');
		handleClose();
	};

	const handleDelete = (index) => {
		setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
	};

	// Filter tasks based on filterBy value
	const filteredTasks = tasks.filter(task => {
		if (filterBy === 'All') return true;
		return task.status === filterBy;
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container spacing={2}>
				<Grid item sm={12} textAlign='center' style={{ marginTop: '30px' }}>
					<Typography variant='h4'>
						To-Do List
					</Typography>
				</Grid>
				<Grid item sm={12} textAlign='center'>
					<Button variant="contained" onClick={() => setOpen(true)}>Add ToDo</Button>
				</Grid>
				<Grid item sm={4}></Grid>
				<Grid item sm={1} style={{ marginTop: '40px' }}>
					<Typography variant='body1' style={{ marginTop: '5px', marginLeft: "30px" }}>
						Filter By :
					</Typography>
				</Grid>
				<Grid item sm={3} style={{ marginTop: '40px' }}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label" size='small'>Filter</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={filterBy}
							size='small'
							label="Filter"
							onChange={(e) => setFilterBy(e.target.value)}
						>
							<MenuItem value={'All'}>All</MenuItem>
							<MenuItem value={'Active'}>Active</MenuItem>
							<MenuItem value={'Completed'}>Completed</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item sm={4}></Grid>
				<Grid item sm={1}></Grid>
				<Grid item sm={10} style={{ marginTop: "50px" }}>
					{tasks.length > 0 ? (
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="center">Task Name</TableCell>
										<TableCell align="center">Assigned To</TableCell>
										<TableCell align="center">Project Name</TableCell>
										<TableCell align="center">Status</TableCell>
										<TableCell align="center">Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredTasks.map((row, index) => (
										<TableRow
											key={index}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell align="center">{row.taskName}</TableCell>
											<TableCell align="center">{row.assignedTo}</TableCell>
											<TableCell align="center">{row.projectName}</TableCell>
											<TableCell align="center">{row.status}</TableCell>
											<TableCell align="center">
												<DeleteIcon color='error' onClick={() => handleDelete(index)} style={{ cursor: 'pointer' }} />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
							No tasks available.
						</Typography>
					)}
				</Grid>

				<Grid item sm={1}></Grid>
			</Grid>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>To Do Form</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item sm={12}>
							<TextField
								label="Task Name"
								variant="outlined"
								fullWidth
								style={{ marginTop: '10px' }}
								size='small'
								value={taskName}
								onChange={(e) => setTaskName(e.target.value)}
							/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								label="Assigned To"
								variant="outlined"
								fullWidth
								size='small'
								value={assignedTo}
								onChange={(e) => setAssignedTo(e.target.value)}
							/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								label="Project Name"
								variant="outlined"
								fullWidth
								size='small'
								value={projectName}
								onChange={(e) => setProjectName(e.target.value)}
							/>
						</Grid>
						<Grid item sm={12}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label" size='small'>Status</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={status}
									size='small'
									label="Status"
									onChange={(e) => setStatus(e.target.value)}
								>
									<MenuItem value={'Active'}>Active</MenuItem>
									<MenuItem value={'Completed'}>Completed</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item sm={8}></Grid>
						<Grid item sm={2}>
							<Button variant="contained" onClick={handleClose}>Close</Button>
						</Grid>
						<Grid item sm={2}>
							<Button variant="contained" onClick={handleSave}>Save</Button>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
}
