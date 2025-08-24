import Sidebar from "@/components/layout/sidebar/sidebar";

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 rounded-md p-3 sm:p-4 lg:p-6">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
