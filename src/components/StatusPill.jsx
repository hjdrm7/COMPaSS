const labels={received:'Received',assigned:'Assigned',in_progress:'In progress',resolved:'Resolved',available:'Available',unavailable:'Unavailable'}
export default function StatusPill({status}) { return <span className={`pill ${status}`}>{labels[status] || status}</span> }
