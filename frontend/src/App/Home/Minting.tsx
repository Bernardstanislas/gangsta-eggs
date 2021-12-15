import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Section } from "../../components/Section";

// @ts-ignore
const MINTING_ENABLED = import.meta.env.VITE_MINTING_ENABLED === "true";

export const Minting = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const noon = 1639566000000;
      const seconds = Math.floor((noon - now.getTime()) / 1000);
      setRemainingSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Section title="Minting" withBorder={true}>
      {MINTING_ENABLED ? (
        <p>
          <strong>MINTING IS OPEN</strong>
        </p>
      ) : (
        <p>
          Get ready for the <strong>release day</strong> and follow our{" "}
          <a
            className="underline"
            href="https://bustling-vicuna-1dd.notion.site/Tutorial-how-to-buy-Gangsta-eggs-light-version-4b593fdbb12748549344f08d2d2f23f6"
          >
            getting started guide
          </a>
          !
        </p>
      )}
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="md:flex-1 shadow-m flex justify-center items:center my-4">
          <img
            className="w-2/3 shadow-bar"
            src="/1.gif"
            alt="first-animation"
          />
        </div>
        <div className="flex justify-center pt-6 md:flex-1">
          {MINTING_ENABLED ? (
            <button className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600">
              <Link to="/app">
                <strong>Connect my wallet</strong>
              </Link>
            </button>
          ) : (
            <div className="flex flex-col items-center space-y-10">
              <div>
                <img
                  className="bg-gray-300 shadow-bar"
                  src="/images/pricing.png"
                  alt="pricing graph"
                ></img>
              </div>
              <div>
                <a
                  href="https://bustling-vicuna-1dd.notion.site/Tutorial-how-to-buy-Gangsta-eggs-light-version-4b593fdbb12748549344f08d2d2f23f6"
                  className="shadow-pixel bg-gray-300 inline-block p-3 text-xl text-gray-600 animate-bounce"
                >
                  <strong>{remainingSeconds}s to launch 🚀</strong>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};
