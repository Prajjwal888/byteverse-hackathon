import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef } from "react";

const images = [
  "http://watchout.iitr.ac.in/images/posts/robin1.png",

  "https://www.taskus.com/wp-content/uploads/2022/09/IMG-20220910-WA0039.jpg",

  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAeUSpx9uneCV0jYU-axmgsZPV485EqHePUxUydPqpEzvLJbVEgLfFax3X8ARitnM1ljw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWT2cVKW2imuxJUtGqRZzJsQtu-pDzPqJWmQ&s",
];

export default function ReceiverDonorSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(slider) {
      sliderRef.current = slider.container;
    },
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
      "(min-width: 1200px)": {
        slides: {
          perView: 5,
          spacing: 25,
        },
      },
    },
  });

  const sliderTrackRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      if (sliderTrackRef.current) {
        offsetRef.current -= 0.5; // Speed control (lower = slower)
        sliderTrackRef.current.style.transform = `translateX(${offsetRef.current}px)`;

        // When half track is moved, reset back to 0
        const trackWidth = sliderTrackRef.current.scrollWidth / 2;
        if (Math.abs(offsetRef.current) >= trackWidth) {
          offsetRef.current = 0;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex justify-center items-center py-10 bg-white overflow-hidden">
      <div ref={sliderRef} className="keen-slider w-[90%] relative">
        <div ref={sliderTrackRef} className="flex">
          {[...images, ...images].map((img, idx) => (
            <div
              key={idx}
              className="keen-slider__slide flex justify-center min-w-[150px]"
              onDragStart={handleDragStart}
            >
              <img
                src={img}
                alt={`Receiver/Donor ${idx + 1}`}
                className="rounded-full w-32 h-32 object-cover shadow-lg hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
