import { DashboardSidebar } from "../components/DashboardSidebar";

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', height: '100%'}}>
            <DashboardSidebar />
            <main className="bg-slate-100" style={{ padding: 10, width:"100%" }}> Main content</main>
        </div>
    );

}

export default Dashboard;