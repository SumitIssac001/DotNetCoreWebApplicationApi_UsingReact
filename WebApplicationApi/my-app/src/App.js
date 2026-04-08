import React, { useEffect, useState } from "react";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    fullName: "",
    mobile: "",
    email: "",
    age: "",
    bloodgroup: "",
    address: ""
  });
  const [editCandidate, setEditCandidate] = useState(null); // track candidate being edited

  // Fetch all candidates
  useEffect(() => {
    fetch("https://localhost:7031/api/DCandidates")
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.error("Fetch failed:", err));
  }, []);

  // Add candidate
  const addCandidate = () => {
    fetch("https://localhost:7031/api/DCandidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCandidate)
    })
      .then(res => res.json())
      .then(c => {
        setCandidates([...candidates, c]);
        setNewCandidate({
          fullName: "",
          mobile: "",
          email: "",
          age: "",
          bloodgroup: "",
          address: ""
        });
      })
      .catch(err => console.error("Add failed:", err));
  };

  // Delete candidate
  const deleteCandidate = (id) => {
    fetch(`https://localhost:7031/api/DCandidates/${id}`, { method: "DELETE" })
      .then(() => setCandidates(candidates.filter(c => c.id !== id)))
      .catch(err => console.error("Delete failed:", err));
  };

  // Save updated candidate
  const saveUpdate = () => {
  fetch(`https://localhost:7031/api/DCandidates/${editCandidate.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editCandidate)
  })
    .then(res => {
      if (res.ok) {
        // Backend returns 204 NoContent, so just update state manually
        setCandidates(candidates.map(c => 
          c.id === editCandidate.id ? editCandidate : c
        ));
        setEditCandidate(null); // exit edit mode
      } else {
        console.error("Update failed with status:", res.status);
      }
    })
    .catch(err => console.error("Update failed:", err));
};


  // Show details
  const showDetails = (c) => {
    alert(`
      Candidate Details:
      Name: ${c.fullName}
      Mobile: ${c.mobile}
      Email: ${c.email}
      Age: ${c.age}
      Blood Group: ${c.bloodgroup}
      Address: ${c.address}
    `);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Donation Candidates</h1>

      <table style={{
        borderCollapse: "collapse",
        width: "100%",
        border: "2px solid #333",
        fontFamily: "Arial, sans-serif"
      }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td>{c.fullName}</td>
              <td>{c.mobile}</td>
              <td>{c.email}</td>
              <td>{c.age}</td>
              <td>{c.bloodgroup}</td>
              <td>{c.address}</td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => setEditCandidate(c)}>✏️</button>
                <button onClick={() => deleteCandidate(c.id)}>🗑️</button>
                <button onClick={() => showDetails(c)}>🔍</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Candidate Form */}
      {editCandidate && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}>
          <h2>Edit Candidate</h2>
          <input value={editCandidate.fullName}
                 onChange={e => setEditCandidate({ ...editCandidate, fullName: e.target.value })} />
          <input value={editCandidate.mobile}
                 onChange={e => setEditCandidate({ ...editCandidate, mobile: e.target.value })} />
          <input value={editCandidate.email}
                 onChange={e => setEditCandidate({ ...editCandidate, email: e.target.value })} />
          <input value={editCandidate.age}
                 onChange={e => setEditCandidate({ ...editCandidate, age: e.target.value })} />
          <input value={editCandidate.bloodgroup}
                 onChange={e => setEditCandidate({ ...editCandidate, bloodgroup: e.target.value })} />
          <input value={editCandidate.address}
                 onChange={e => setEditCandidate({ ...editCandidate, address: e.target.value })} />
          <button onClick={saveUpdate}>💾 Save</button>
          <button onClick={() => setEditCandidate(null)}>❌ Cancel</button>
        </div>
      )}

      {/* Add Candidate Form */}
      <h2 style={{ marginTop: "30px" }}>Add Candidate</h2>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input placeholder="Full Name" value={newCandidate.fullName}
               onChange={e => setNewCandidate({ ...newCandidate, fullName: e.target.value })} />
        <input placeholder="Mobile" value={newCandidate.mobile}
               onChange={e => setNewCandidate({ ...newCandidate, mobile: e.target.value })} />
        <input placeholder="Email" value={newCandidate.email}
               onChange={e => setNewCandidate({ ...newCandidate, email: e.target.value })} />
        <input placeholder="Age" value={newCandidate.age}
               onChange={e => setNewCandidate({ ...newCandidate, age: e.target.value })} />
        <input placeholder="Blood Group" value={newCandidate.bloodgroup}
               onChange={e => setNewCandidate({ ...newCandidate, bloodgroup: e.target.value })} />
        <input placeholder="Address" value={newCandidate.address}
               onChange={e => setNewCandidate({ ...newCandidate, address: e.target.value })} />
        <button style={{ marginTop: "10px" }} onClick={addCandidate}>Add</button>
      </div>
    </div>
  );
}

export default App;
