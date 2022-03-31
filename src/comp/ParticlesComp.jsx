
import React from "react";
import Particles from "react-tsparticles";
export const ParticlesComp = () => {
  const particlesInit = (main) => {
    console.log(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <Particles
      className="particles"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            // value: "#0d47a1",
          },
        },
        fpsLimit: 10,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: false,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.4,
              size: 20,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 600,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#54ABAB",
            width: 20,
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1700,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "star",
          },
          size: {
            random: true,
            value: 10,
          },
        },
        detectRetina: true,
      }}
    />
  );
};
