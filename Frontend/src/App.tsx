import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen ">
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
    </div>
  );
}

export default App;
