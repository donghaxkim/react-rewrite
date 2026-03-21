export default function Badge({ color }: { color: string }) {
  return (
    <span className={`flex px-4 py-2 ${color}`}>Badge</span>
  );
}
