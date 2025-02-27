export default function UserDetailsPage({ params }) {
    return (
      <div>
        <h1 className="text-2xl font-bold">User Details - {params.userId}</h1>
        <p>More user details will go here.</p>
      </div>
    );
  }
  