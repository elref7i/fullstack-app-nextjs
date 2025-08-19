import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="space-y-6 gap-3 flex w-full p-5">
      <Sidebar />
      {children}
    </div>
  );
}
