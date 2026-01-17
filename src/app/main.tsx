import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.css';
import AppRoutes from '../pages/routes/AppRoues';
import reportWebVitals from '../shared/lib/reportWebVitals';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient();
const router = createBrowserRouter(AppRoutes());
const root = ReactDOM.createRoot(rootElement);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
