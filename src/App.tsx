import {Route, Routes, useLocation} from 'react-router-dom'
import { GuestPage } from './pages/GuestPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { ProtectRoutes } from './hooks/protectRoutes';
import { InputFormIdPage } from './pages/InputFormIdPage';
import { CreateFormPage } from './pages/CreateFormPage';
import { InputAnswersPage } from './pages/InputAnswersPage';
import { UserFormPage } from './pages/UserFormPage';
import { NotFound } from './pages/NotFoundPage';

function App() {

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={ <GuestPage /> }>
          <Route path="signup" element={ <SignUpPage />} />
          <Route path="signin" element={ <SignInPage />} />
        </Route>
        <Route element={ <ProtectRoutes /> }>
          <Route path='forms' element={ <HomePage /> }>
            <Route path="formid" element={<InputFormIdPage />} />
          </Route>
          <Route path='forms/create' element={ <CreateFormPage /> } />
          <Route path='forms/:formid/questions' element={ <InputAnswersPage /> } />
          <Route path='forms/:formid/update' element={ <UserFormPage updateactive={true} /> } />
          <Route path='forms/:formid/poolsanswers' element={ <UserFormPage updateactive={false} /> } />
        </Route>
        <Route path='*' element={ <NotFound /> } />
      </Routes>
      {background && (
        <Routes>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="forms/formid" element={<InputFormIdPage />} />
        </Routes>
      )}
    </>
  )
}

export default App;
