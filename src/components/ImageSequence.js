import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@lenis/lenis';
import './ImageSequence.css'; // Import your CSS

gsap.registerPlugin(ScrollTrigger);

const ImageSequence = () => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const frames = { currindex: 1, maxindex: 1345 };

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Preload images
        const preloadImages = () => {
            const loadedImages = [];
            for (let i = 0; i <= frames.maxindex; i++) {
                const imageUrl = `./images/frame_${i.toString().padStart(4, '0')}.jpeg`;
                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                    loadedImages[i] = img;
                    if (loadedImages.length === frames.maxindex + 1) {
                        setImages(loadedImages);
                    }
                };
            }
        };

        preloadImages();

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const loadImage = (index) => {
            if (index >= 0 && index < images.length) {
                const img = images[index];
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                const scaleX = canvas.width / img.width;
                const scaleY = canvas.height / img.height;
                const scale = Math.max(scaleX, scaleY);
                
                const newWidth = img.width * scale;
                const newHeight = img.height * scale;
                
                const offsetX = (canvas.width - newWidth) / 2;
                const offsetY = (canvas.height - newHeight) / 2;
                
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
            }
        };

        // GSAP Animations
        gsap.to(frames, {
            currindex: frames.maxindex,
            scrollTrigger: {
                trigger: '.parent',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2,
                markers: true,
                onUpdate: () => {
                    const currentIndex = Math.floor(frames.currindex);
                    loadImage(currentIndex);

                    gsap.to('.animate1', {
                        opacity: currentIndex > 50 ? 0 : 1,
                        ease: 'linear',
                        duration: 2
                    });

                    gsap.to('.animate2', {
                        opacity: (currentIndex > 200 && currentIndex <= 500) ? 1 : 0,
                        y: (currentIndex > 200 && currentIndex <= 500) ? '120%' : '0%',
                        ease: 'linear',
                        duration: 2
                    });

                    gsap.to('.animate3', {
                        opacity: (currentIndex > 700 && currentIndex <= 800) ? 1 : 0,
                        ease: 'linear',
                        duration: 2
                    });

                    gsap.to('.panel', {
                        x: (currentIndex > 800 && currentIndex <= 900) ? '0%' : '100%',
                        ease: 'expo.out',
                        duration: 2
                    });

                    gsap.to('.panel', {
                        opacity: (currentIndex > 900 && currentIndex <= 1000) ? 0 : 1,
                        ease: 'linear',
                        duration: 2
                    });

                    gsap.to('canvas', {
                        scale: (currentIndex > 1000 && currentIndex <= 1100) ? -1 : 1,
                        ease: 'linear',
                        duration: 3
                    });

                    gsap.to('.panelism', {
                        opacity: (currentIndex > 1100 && currentIndex <= 1200) ? 1 : 0,
                        ease: 'expo.out',
                        duration: 2
                    });

                    gsap.to('.panelism .line', {
                        width: (currentIndex > 1100 && currentIndex <= 1200) ? '200px' : '0px',
                        ease: 'expo.out',
                        duration: 2
                    });

                    gsap.to('canvas', {
                        scale: (currentIndex > 1300 && currentIndex <= 1500) ? 1 : 1,
                        ease: 'linear',
                        duration: 2
                    });
                }
            }
        });
    }, [images]);

    return (
        <div className="w-full">
            <div className="parent relative top-0 left-0 w-full h-[2000vh]">
                <div className="w-full sticky top-0 left-0 h-screen overflow-x-hidden">
                    <canvas className="w-full h-screen" ref={canvasRef}></canvas>
                    <div className="absolute animate1 z-[2] text-white bottom-10 w-1/2 left-10">
                        <h1 className="leading-20 font-[100] text-3xl">
                            &copy; 2024 RKV *
                        </h1>
                        <h1 className="text-3xl">SHAPING BRANDS - CRAFTING</h1>
                    </div>

                    <div className="absolute animate2 flex z-[2] text-white top-10 w-full text-center justify-center opacity-0">
                        <div>
                            <h1 className="leading-20 font-[100] uppercase text-6xl">
                                ELEVATING AESTHETICS
                            </h1>
                            <h1 className="text-xl w-full">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, odio?</h1>
                        </div>
                    </div>

                    <div className="absolute animate3 flex z-[2] text-white bottom-10 w-1/2 right-10 text-right opacity-0">
                        <h1 className="leading-20 font-[100] uppercase text-6xl">
                            Transforming Visions
                        </h1>
                        <h1 className="text-xl w-1/2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, odio?</h1>
                    </div>
                    
                    <div className="w-1/3 panel translate-x-full h-screen bg-white absolute right-0 top-0 z-[2] p-10">
                        <h3 className="panelelem text-xl font-[100]">&copy; 2024 RKV</h3>
                        <p className="panelelem mt-10 text-xl">
                            Scrupting Digital
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Assumenda deserunt eveniet repudiandae adipisci libero aperiam 
                             blanditiis eligendi eaque aliquam voluptates!
                        </p>
                        <button className="panelelem border-[1px] px-3 py-2 border-[#555] font-[100] mt-6">
                         Get Reviews
                        </button>
                        <div className="panelelem absolute bottom-10">
                            <h3 className="text-xl">Innovating Design</h3>
                            <p className="text-sm mt-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur 
                                facere rerum in excepturi, tenetur amet!</p>
                            <button className="bg-black text-white px-7 text-sm mt-4 my-4 font-[100] capitalize">
                             Experiences
                            </button>
                        </div>
                    </div>

                    <div className="absolute panelism text-white top-1/2 left-1/2 -translate-x-1/2 text-center text-6xl tracking-tighter opacity-0">
                        &copy; panelism <span className="line w-0 h-1 bg-white inline-block"></span> 2024
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSequence;
