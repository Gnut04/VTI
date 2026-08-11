const Register = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-96 rounded-lg border p-6 shadow">
        <h2 className="mb-6 text-center text-3xl font-bold">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="mb-4 w-full rounded border p-2"
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border p-2"
        />

        <button className="w-full rounded bg-green-600 p-2 text-white hover:bg-green-700">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;