"use client";
import Image from 'next/image';

const images = [
  { id: 237, hint: "dog puppy" },
  { id: 433, hint: "nature forest" },
  { id: 577, hint: "mountain landscape" },
  { id: 582, hint: "city urban" },
  { id: 593, hint: "beach ocean" },
  { id: 659, hint: "food dessert" },
  { id: 718, hint: "architecture building" },
  { id: 783, hint: "animal wildlife" },
  { id: 837, hint: "abstract pattern" },
  { id: 881, hint: "car vehicle" },
  { id: 911, hint: "flower plant" },
  { id: 945, hint: "travel adventure" },
];

const GalleryApp = () => {
  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Gallery</h2>
      </div>
      <div className="flex-grow p-2 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {images.map(image => (
            <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
              <Image 
                src={`https://picsum.photos/id/${image.id}/200/200`}
                alt={`Gallery image ${image.id}`}
                fill
                className="object-cover"
                data-ai-hint={image.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryApp;
