'use client';

import { useSearchParams } from 'next/navigation';

export const useGetOptionsQuery = () => {
  const searchParams = useSearchParams();

  const getOptions = () => {
    const optionsParam = searchParams.get('options');
    if (!optionsParam) return [];

    const optionsArray = optionsParam.split(';').map((item) => {
      const [name, options] = item.split(':');
      return { name, options: options.split(',').map((option) => ({ name: option })) };
    });

    return optionsArray;
  };

  return { getOptions };
};
