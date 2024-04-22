import { useState } from 'react';
import { useLocalStorageState } from '@/useLocalStorageState';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import CityCard from '@/components/CityCard';

import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

const API_KEY = 'https://countriesnow.space/api/v0.1/countries';

export async function loader() {
  const response = await fetch(API_KEY);
  const countryData = await response.json();
  return countryData.data;
}

export const MainPage = () => {
  const countries = useLoaderData();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [addedCities, setAddedCities] = useLocalStorageState([], 'addedCities');

  function handleRemoveCity(city) {
    setAddedCities(addedCities.filter((c) => c.name !== city.name));
  }

  async function handleGetLocation() {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&appid=2c006b98e2ee5b157418ce7c4325967d`
      );
      const data = await res.json();
      console.log(data);
      const { lat, lon } = data[0];
      const weather = await handleGetWeather(lat, lon);
      const newData = { ...data[0], weather };
      console.log(newData);
      setAddedCities([...addedCities, newData]);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedCity('');
      setSelectedCountry('');
      console.log(addedCities);
    }
  }

  async function handleGetWeather(lat, lon) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=2c006b98e2ee5b157418ce7c4325967d`
    );
    const data = await res.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    if (!selectedCountry) {
      return;
    }
    async function getCities() {
      const res = await fetch(
        'https://countriesnow.space/api/v0.1/countries/cities',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            country: selectedCountry,
          }),
        }
      );
      const cities = await res.json();
      setCities(cities.data);
    }
    getCities();
  }, [selectedCountry]);

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
              Şehir seçerek hava durumunu öğrenebilirsiniz.
            </h2>
            <p className='my-4 text-base text-gray-200'>
              Şehrini seç ve hava durumunu öğren.
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size='lg'
                  className='bg-blue-600 text-white hover:bg-blue-500'
                >
                  Şehir Ekle
                </Button>
              </SheetTrigger>
              <SheetContent className='flex flex-col'>
                <SheetHeader>
                  <SheetTitle>Şehir Ekle</SheetTitle>
                </SheetHeader>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger className='w-[180px] mt-10'>
                    <SelectValue placeholder='Bir ulke secin' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ülke</SelectLabel>
                      {countries.map((country, i) => (
                        <SelectItem key={i} value={country.country}>
                          {country.country}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  disabled={selectedCountry ? false : true}
                  value={selectedCity}
                  onValueChange={setSelectedCity}
                >
                  <SelectTrigger className='w-[180px] mt-10'>
                    <SelectValue placeholder='Bir şehir seçin' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Şehir</SelectLabel>
                      {cities.map((city, i) => (
                        <SelectItem key={i} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <SheetFooter className='mt-auto'>
                  <SheetClose asChild>
                    <Button
                      onClick={handleGetLocation}
                      className=' bg-blue-600 text-white hover:bg-blue-500'
                    >
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>
      <section className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>
        {addedCities &&
          addedCities.map((city, i) => (
            <CityCard key={i} city={city} handleRemoveCity={handleRemoveCity} />
          ))}
      </section>
    </>
  );
};

export default MainPage;
