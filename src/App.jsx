import 'devextreme/dist/css/dx.light.css';
import { Outlet } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import ErrorBoundary from "./providers/ErrorBoundary";
function App() {

  return (
    <>
      <ErrorBoundary>
        <Layout>
          <Outlet />
        </Layout>
      </ErrorBoundary>
    </>
  )
}

export default App;
