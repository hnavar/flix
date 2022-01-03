import React, { FC, useState } from 'react';
import Particles, { tsParticles } from 'react-tsparticles';


const TsParticles:FC<any> = () => {
  const particlesInit = (main: any) => {
    console.log('start', main)
  }

  const particlesLoaded = (container: any) => {
    console.log(container);
  }

//   tsParticles.loadJSON("tsparticles", "presets/default.json")
//     .then((container: any) => {
//       console.log("calback - tsparticles config loaded")
//     })
//     .catch((err) => {
//       console.log(err);
//     })


//   tsParticles.load("tsparticles", {

//   });

//   tsParticles.loadFromArray("tsparticles", [
//     {

//     },
//     {

//     }
//   ]);

//   // after initialization this can be used.

// /* tsParticles.setOnClickHandler(@callback); */

// /* this will be fired from all particles loaded */

// tsParticles.setOnClickHandler((event, particles) => {
//   /* custom on click handler */
// });

// const particles = tsParticles.domItem(0);

// particles.play();

// particles.pause();


  return (
    <>
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0d47a1",
          },
        },
        fpsLimit: 45,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
    </>
  );
};


export default TsParticles;