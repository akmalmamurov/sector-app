import Image from "next/image";

const ThumbsGallery = ({ mainImage }: { mainImage: string }) => {
  return (
    <div className="flex">
      <Image
        width={500}
        height={500}
        src={`${process.env.NEXT_PUBLIC_API_URL}/${mainImage}`}
        alt={`Thumbnail`}
        className="cursor-pointer rounded-lg aspect-square max-w-[500px]"
      />
    </div>
  );
};

export default ThumbsGallery;
