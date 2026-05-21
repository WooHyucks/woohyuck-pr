import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import { ROUTE_PATHS } from '@/lib/index';
import PortfolioPpt from './pages/PortfolioPpt';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Routes>
          <Route path="/ppt" element={<PortfolioPpt />} />
          <Route
            path={ROUTE_PATHS.HOME}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </MotionConfig>
  );
}
