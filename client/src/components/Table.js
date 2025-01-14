import React from "react"
import { useEffect, useState} from "react"
import TextForm from "./TextForm";
const api_base = 'http://localhost:3007';

function Table () {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState('');
	const [newUserNumber, setNewUserNumber] = useState('');
	const [newUserGuardId, setNewUserGuardId] = useState('');
	const [numberOfTexts, setNumberOfTexts] = useState('')
	const [timeHistory, setTimeHistory] = useState('test')

	useEffect(() => {
		GetUsers();
	}, []);

	const GetUsers = () => {
		fetch(api_base + '/users')
			.then(res => res.json())
			.then(data => setUsers(data))
			.catch((err) => console.error("Error: ", err));
			console.log(users)
	}

	const deleteUser = async id => {
		const data = await fetch(api_base + '/users/delete/' + id, { method: "DELETE" }).then(res => res.json());
		setUsers(users => users.filter(todo => todo._id !== data.result._id));
	}

	const putUser = async id => {
		const data = await fetch(api_base + '/users/' + id, { 
			method: "PUT",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				textHistory: "chordle",	
			})
		}).then(res => res.json());
		setUsers([...users, data])
	}

	// editUser1(() => {
	// 	async function updateUser() {
	// 		const requestOptions = {
	// 			method: 'PUT',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({ name: 'example' })
	// 		};
	// 		const response = await fetch('');
	// 		const data = await response.json();
	// 		UserID(data.id);
	// 	}
	// 	updateUser();
	// }, []);

	const addUser = async () => {
		const data = await fetch(api_base + "/users/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				name: newUser,
				phoneNumber: newUserNumber,
				guardId: newUserGuardId
			})
		}).then(res => res.json());

		setUsers([...users, data]);
		setNewUser("");
		setNewUserNumber("")
		setNewUserGuardId("")
	}

	const timeValue = (stamp) => {
		return new Date().toLocaleString()
	}
	
    return(
        <div className="table">
			<div className="todos">
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Guard ID Number</th>
							<th>Phone Number</th>
                    		<th>Text</th>
							<th>Text History</th>
							<th>Amount of texts sent</th>
						</tr>
					</thead>
					{users.map(user => (
						<tbody>
							<td>{user.name}</td>
							<td>{user.guardId}</td>
							<td>{user.phoneNumber}</td>					
							<td>
								<button>
								<TextForm 
								user={user}
								users={users}/>
								</button>
							</td>
							<td>
								{timeValue(user.timestamp)}
							</td>
							<td>
								<h1>{timeHistory}</h1>
								<button onClick={putUser}> edit le user</button>
							</td>
							
							<div onClick={() => deleteUser(user._id)}>x</div>
    		    	</tbody>
					))}
				</table>
				
			</div>	
			<div className="adduser">
				<tr>
					<td>
						<input placeholder="Input Full Name" type="text" onChange={e => setNewUser(e.target.value)} value={newUser}/>
					</td>
					<td>
						<input placeholder="Input Guard Number" type="text" onChange={e => setNewUserGuardId(e.target.value)} value={newUserGuardId}/>
					</td>
					<td>
						<input placeholder="Input Phone Number" type="text" onChange={e => setNewUserNumber(e.target.value)} value={newUserNumber}/>	
					</td>
					<td>
						<div className="button" onClick={addUser}>Add User</div>
					</td>
				</tr>
			</div>
		</div>
    )
}
export default Table