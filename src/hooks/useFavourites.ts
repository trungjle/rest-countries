import { useCallback, useEffect, useState } from 'react';

export function useFavourites() {
  const [favouriteCountries, setFavouriteCountries] = useState<string[]>(() => {
    const storedCountries = localStorage.getItem('favouriteCountries');
    return storedCountries ? JSON.parse(storedCountries) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'favouriteCountries',
      JSON.stringify(favouriteCountries)
    );
  }, [favouriteCountries]);

  // Function to handle adding or removing a country from favourites
  const handleFavourite = useCallback((cca2: string) => {
    setFavouriteCountries((prevFavourites) => {
      const isAlreadyFavourite = prevFavourites.includes(cca2);
      return isAlreadyFavourite
        ? prevFavourites.filter((c) => c !== cca2)
        : [...prevFavourites, cca2];
    });
  }, []);

  const isFavourite = useCallback(
    (cca2: string) => favouriteCountries.includes(cca2),
    [favouriteCountries]
  );

  return {
    favouriteCountries,
    isFavourite,
    handleFavourite,
  };
}
