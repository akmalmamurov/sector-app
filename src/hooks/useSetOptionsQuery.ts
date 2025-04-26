'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useSetOptionsQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setOptions = (optionsArray: { name: string; options: { name: string }[] }[]) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

    const optionsString = optionsArray
      .map((opt) => `${opt.name}:${opt.options.map((o) => o.name).join(',')}`)
      .join(';');
    console.log(optionsString);

    currentParams.set('options', optionsString);

    router.push(`?${currentParams.toString()}`);
  };

  return { setOptions };
};
