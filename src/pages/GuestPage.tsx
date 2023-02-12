import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { RecentlyForms } from '../components/RecentlyForms';
import { Header } from '../components/Header';
import { IconBtn } from '../components/IconBtn';
import { UniversalBtn } from '../components/UniversalBtn';
import { Info } from '../components/info';

export function GuestPage() {

    const location = useLocation();

    const navigate = useNavigate();

    const signUp = () => { 
        let path = `/signup`;
        navigate(path, { replace: false, state:{ background: location } });
    }

    const signIn = () => { 
      let path = `/forms?limit=2&offset=0`;
      navigate(path, { replace: false, state:{to: path} });
    }
  
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-none">
          <Header title='Анкета.ру'>
            <IconBtn 
              description='Зарегистрироваться' 
              size='75px'
              onClick={signUp}
              path=<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            />
            <IconBtn 
              description='Войти' 
              size='75px'
              onClick={signIn}
              path=<path d="M10 17v-3H3v-4h7V7l5 5l-5 5m0-15h9a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-2h2v2h9V4h-9v2H8V4a2 2 0 0 1 2-2Z"/>
            />
            </Header>
          </div>
  


        <div className='w-full grid grid-cols-2 grid-rows-1 gap-x-[10%] px-[35%] py-[5%]'>
          <UniversalBtn text="Создать опрос" disabled={true} height="80px" />
          <UniversalBtn text="Пройти опрос" disabled={true} height="80px" />
        </div>
  
        <div className='flex-none'>
          <RecentlyForms />
        </div>
  
        <div className="grow grid place-items-center">
          <Info msg="Войдите в систему, чтобы создавать, просматривать или проходить опросы" />
        </div>
        <Outlet />
      </div>
    );
  }