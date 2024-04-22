import { useLoaderData } from 'react-router-dom';
import CityCard from '@/components/CityCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export async function loader({ params: { cityName } }) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=2c006b98e2ee5b157418ce7c4325967d`
  );
  const data = await res.json();
  console.log(data);
  const { lat, lon } = data[0];
  const weather = await handleGetWeather(lat, lon);
  const newData = { ...data[0], weather };
  console.log(newData);
  return { newData };
}

async function handleGetWeather(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=2c006b98e2ee5b157418ce7c4325967d`
  );
  const data = await res.json();
  console.log(data);
  return data;
}

const CityPage = () => {
  const { newData } = useLoaderData();
  const {
    newData: {
      name,
      // eslint-disable-next-line no-unused-vars
      weather: { daily },
    },
  } = useLoaderData();
  return (
    <>
      <section className='relative py-10 overflow-hidden bg-black sm:py-16 lg:py-24 xl:py-32'>
        <div className='absolute inset-0'>
          <img
            className='object-cover w-full h-full md:object-left md:scale-150 md:origin-top-left'
            src='https://images.unsplash.com/photo-1472190649224-495422e1b602?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
        </div>
        <div className='absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent' />
        <div className='absolute inset-0 block bg-black/60 md:hidden' />
        <div className='relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
          <div className='w-3/4 text-left'>
            <h2 className='text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl'>
              {name}
            </h2>
            <p className='my-4 text-base text-gray-200'>
              Weather for the next <span className='font-bold'>7 days</span>
            </p>
          </div>
          <Link to={'/'}>
            <Button size='lg' className='bg-blue-600 hover:bg-blue-500'>
              Back
            </Button>
          </Link>
        </div>
      </section>
      <section className='mx-auto flex justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>
        <CityCard city={newData} withMenuButton={false} />
        <div>
          <Carousel className='w-full max-w-5xl'>
            <CarouselContent className='-ml-1'>
              {daily.slice(1, 8).map((_, index) => (
                <CarouselItem
                  key={index}
                  className='pl-1 md:basis-1/2 lg:basis-1/3'
                >
                  <Card>
                    <CardContent className=' p-0 flex items-center justify-center'>
                      <CityCard
                        city={newData}
                        withMenuButton={false}
                        index={index + 1}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default CityPage;
