import React from "react";
import { NextSeo } from "next-seo";

const Page = () => (
  <>
    <NextSeo
      title="Current changes monitored"
      description="This is a page to demonstrate some of my skills as a frontend programmer."
      canonical="https://currency-exchange-fjmg84.vercel.app/"
      openGraph={{
        url: "https://currency-exchange-fjmg84.vercel.app/",
        title: "currency-exchange-fjmg84",
        description:
          "This is a page to demonstrate some of my skills as a frontend programmer.",

        siteName: "currency exchange",
      }}
    />
  </>
);

export default Page;
