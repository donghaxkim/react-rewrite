export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
      </div>
      <p className="text-sm text-gray-500">Last updated: today</p>
    </div>
  );
}
