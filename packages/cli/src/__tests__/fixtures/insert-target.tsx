import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <Card>
        <h2>Existing Card</h2>
      </Card>
      <div className="sidebar">
        <p>Sidebar content</p>
      </div>
    </main>
  );
}
