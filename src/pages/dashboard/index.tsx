import DashboardContent from './components/DashboardContent';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b">
      <main className="flex-grow">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-up">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Upload your CV and let our AI tools help you land your dream job
              </p>
            </div>
            
            <DashboardContent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
