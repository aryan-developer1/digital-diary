import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index';

const App = () => {
  return (
    <div className="px-4 pt-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24" >
       <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </div>
  )
}

export default App
