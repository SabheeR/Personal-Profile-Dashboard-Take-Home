export default function ProfileCard({ user, onFetch }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`.trim();
  const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
  const dob = formatDOB(user.dob?.date);

  return (
    <div className="profile-grid">
      <div className="photo-only">
        <img className="photo" src={user.picture?.large} alt={`${fullName} profile`} />
      </div>

      <section className="card details" aria-label="Profile details">
        <ul className="list">
          <li className="item"><span className="label">User Name</span><span className="value">{fullName}</span></li>
          <li className="item"><span className="label">Address</span><span className="value">{address}</span></li>
          <li className="item"><span className="label">Phone Number</span><span className="value">{user.phone}</span></li>
          <li className="item"><span className="label">Email</span><span className="value">{user.email}</span></li>
          <li className="item"><span className="label">Date of Birth</span><span className="value">{dob}</span></li>
        </ul>
      </section>
      {/*Prompted with GPT to help with button not appearing underneath container when resized*/}
      {/*Grid can place button under photo on desktop, after details on mobile */}
      <div className="actions">
        <button className="button" onClick={onFetch}>Fetch New User</button>
      </div>
    </div>
  );
}

function formatDOB(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`; /*Prompted with GPT to return the proper DOB format*/
}
