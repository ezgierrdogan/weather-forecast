import { EllipsisVertical } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Link } from 'react-router-dom';

const CityCard = ({
  city,
  handleRemoveCity = () => {},
  withMenuButton = true,
  index = 0,
}) => {
  const {
    name,
    country,
    weather: { daily },
  } = city;
  const img = `http://openweathermap.org/img/w/${daily[index].weather[0].icon}.png`;

  function getDay(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Unix zaman damgası saniye cinsinden olduğu için 1000 ile çarpıyoruz
    const weekday = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
    return weekday;
  }

  return (
    <div className='w-96 bg-no-repeat bg-cover z-0 relative cursor-pointer bg-card overflow-hidden shadow-md rounded-xl duration-200 hover:shadow-xl'>
      <div
        id='overlay'
        className='w-full h-full bg-black bg-opacity-30 absolute -z-10'
      ></div>
      <div className='py-10 relative flex flex-col gap-2 items-center z-5'>
        <div className='text-center'>
          <h2 className='text-xl font-bold leading-tight text-white'>
            {getDay(daily[index].dt)}
          </h2>
          <p className='font-bold text-base text-white'>{}</p>
        </div>
        <img src={img} alt='' />
        <div className='relative'>
          <h2 className='text-3xl font-bold text-white'>{name}</h2>
          <div className='absolute -top-2 -right-12 w-12 h-5 bg-yellow-400 rounded-xl flex justify-center items-center text-white font-bold'>
            <span>{country}</span>
          </div>
        </div>
        <div className='text-white uppercase font-medium mb-2'>
          {daily[index].weather[0].description}
        </div>
        <div
          id='info'
          className='mx-4 w-10/12 px-4 py-2 bg-slate-400 bg-opacity-60 rounded-2xl flex justify-between gap-2'
        >
          <div className='flex flex-col items-center gap-2 text-center'>
            <h3 className='text-white'>Current Temp.</h3>
            <p className='text-xl font-bold text-white'>
              {Math.floor(daily[index].temp.day)} °C
              {console.log(daily[index].temp.day)}
            </p>
          </div>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h3 className='text-white'>Feels Like</h3>
            <p className='text-xl font-bold text-white'>
              {Math.floor(daily[index].feels_like.day)} °C
            </p>
          </div>
          <div className='flex flex-col items-center text-center gap-2'>
            <h3 className=' text-white'>Humidity</h3>
            <p className='text-xl font-bold text-white'>
              {daily[index].humidity} %
            </p>
          </div>
        </div>
        {withMenuButton && (
          <Menubar className='absolute top-4 right-4 text-white bg-transparent border-none active:text-black'>
            <MenubarMenu>
              <MenubarTrigger>
                <EllipsisVertical className='text-inherit' />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link
                    onClick={() => console.log(city)}
                    to={`/cities/${city.name}`}
                  >
                    View Weather
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <a href='#' onClick={() => handleRemoveCity(city)}>
                    Remove City
                  </a>
                </MenubarItem>
                <MenubarSeparator />
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
    </div>
  );
};

export default CityCard;
