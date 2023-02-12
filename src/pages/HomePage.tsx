import { useNavigate, useLocation, Outlet, useSearchParams } from 'react-router-dom';
import { RecentlyForms } from '../components/RecentlyForms';
import { Header } from '../components/Header';
import { IconBtn } from '../components/IconBtn';
import { UniversalBtn } from '../components/UniversalBtn';
import { Info } from '../components/info';
import { useJWT } from '../hooks/jwt';
import { UserForm } from '../components/userForm';
import { useUserForms } from '../hooks/userForms';
import { InfoWindow } from '../components/InfoWindow';

export function HomePage() {

  const location = useLocation();

  const {token, login} = useJWT();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {forms, error, delUserForm, setLimit, limit, offset, setError, setOffset} = useUserForms(token, searchParams.get('limit'), searchParams.get('offset'));

  const createForm = () => {
    navigate('create', { replace: false, state:{} })
  }

  const enterForm = (formid: string) => {
    navigate(formid+"/update", { replace: false, state:{} })
  }

  const takeForm = () => {
    navigate('formid', { replace: false, state:{ from: location.pathname, background: location } })
  }

  const expandListForms = () => {
    setLimit(limit+2)
    navigate("/forms?limit="+(limit+2)+"&offset="+offset, {replace: true})
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex-none self-start">
        <Header title='Анкета.ру'>
          <IconBtn 
            description={login} 
            size='75px'
            onClick={()=>{}}
            path=<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"/>
          />
        </Header>
      </div>

      <div className='w-full grid grid-cols-2 grid-rows-1 gap-x-[10%] px-[35%] py-[5%]'>
          <UniversalBtn text="Создать опрос" disabled={false} onClick={createForm} height="80px" />
          <UniversalBtn text="Пройти опрос" disabled={false} onClick={takeForm} height="80px" />
      </div>
      
      <div className='self-start'>
        <RecentlyForms />
      </div>

      <div className='w-[75%] py-[5%]'>
        <div className='grid grid-cols-2 place-content-between gap-y-[5%]'>
          {forms.length
          ? <>
            {forms.map(form => <div className='flex flex-col items-center' key={form.id}><UserForm form={form} onDelete={() => delUserForm(form)} onEnter={() => enterForm(form.id)} /></div>)}
            <div className="col-span-2 place-self-center"><IconBtn size="75px" onClick={() => expandListForms()} path=<path d="m12 15.375l-6-6l1.4-1.4l4.6 4.6l4.6-4.6l1.4 1.4Z" /> /></div>
          </>
          : <div className="col-span-2 place-self-center"> <Info msg="Вы не создавали еще опросов, попробуйте" /> </div>
          }
          </div>
      </div>

      {error && <InfoWindow msg={error} onClose={() => {
        setError("")
        setLimit(2)
        setOffset(0)
        navigate('/forms?limit=2&offset=0', {replace: true})}} />}

      <Outlet />
    </div>
  );
}
