import { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import Campaign from "@interfaces/Campaign";
import SlugParam from "@interfaces/SlugParam";
import getCookie from "@utils/getCookie";

interface CampaignDetailProps {
  campaign: Campaign;
  error: string | null;
}

export const getStaticPaths = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`);
    const campaigns: Campaign[] = await res.json();

    const paths = campaigns.map((campaign) => campaign.slug);

    return {
      paths: paths.map((path) => ({ params: { slug: path } })),
      fallback: false,
    };
  } catch (err) {
    return [];
  }
};

export const getStaticProps = async ({ params }: { params: SlugParam }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${params.slug}`
    );
    const campaign: Campaign = await res.json();

    return {
      props: {
        campaign: campaign,
        error: null,
      },
      revalidate: 5,
    };
  } catch (err) {
    return {
      props: {
        campaign: {},
        error: JSON.stringify(err),
      },
      revalidate: 5,
    };
  }
};

const CampaignDetail: NextPage<CampaignDetailProps> = ({ campaign, error }) => {
  const [email, setEmail] = useState<string>();
  const [registered, setRegistered] = useState(false);

  const subscribe = () => {
    const csrftoken = getCookie("csrftoken");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        email: email,
        campaign: campaign.id,
      }),
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/subscribers/`,
      requestOptions
    ).then((res) => {
      if (res.status == 201) {
        setEmail("");
        setRegistered(true);
      }
    });
  };

  return (
    <>
      {error ? <h1>{JSON.parse(error).message}</h1> : null}
      <div className="before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-code-pattern before:opacity-90 "></div>
      <div className="h-screen text-white relative w-screen bg-body">
        <div className="grid justify-items-stretch h-5/6 w-4/5 grid-cols-1 md:grid-cols-3 gap-3 relative">
          <div className="flex flex-col self-center w-full items-start col-span-2 md:m-10 md:ml-32 ml-10">
            <div className="h-10 w-10 md:h-32 md:w-32">
              <Image
                className="rounded-full"
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE}/${campaign.logo}`}
                alt="alt"
                height={128}
                width={128}
              />
            </div>
            <h1 className="text-3xl font-bold mt-2 mb-2 cursor-pointer">
              {/* {campaign.title} */}
              {"Build an instagram clone with Django, AWS and Next JS"}
            </h1>
            <p className="w-full overflow-hidden mb-3">
              {/* {campaign.description} */}
              {
                "You will build and use a component styling framework (much like Tailwind but for React Native), Learn Typescript, Redux (with Redux Toolkit). Deep Linking, Notifications, Multiple Language support, Gestures, Complete Authentication process with automatic Refresh token updates, Complete Deployment guide with Beta Testing, Release Management, Over the air updates, and much more."
              }
            </p>
          </div>
          <div className="flex flex-col self-center w-full items-start col-span-1 md:m-10 md:ml-40 ml-10">
            {registered ? (
              <div className="flex flex-row">
                <Image
                  src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-tick-success-flatart-icons-flat-flatarticons.png"
                  height={32}
                  width={32}
                  className="align-middle self-center rounded-full"
                />
                <span className="self-center ml-2">
                  Thanks for registering.
                </span>
              </div>
            ) : (
              <div>
                <input
                  type="email"
                  value={email}
                  className="w-full h-10 m-2 p-1 text-black"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(e) => (e.key == "Enter" ? subscribe() : null)}
                />
                <button
                  className="w-full h-10 bg-blue-600 font-bold text-sm m-2"
                  onClick={subscribe}
                >
                  SUBSCRIBE
                </button>
                <small className="text-xs w-full m-2 mt-0">
                  We respect your privacy. Unsubscribe at any time.
                </small>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="flex justify-center  w-screen mt-10">
          <a href="https://youtube.com" className="text-xl flex flex-row ">
            <span className="self-center mr-2">Take me to Youtube</span>
            <Image
              src="https://img.icons8.com/color/48/000000/youtube-play.png"
              className="rounded-full align-middle self-center"
              alt="alt"
              height={36}
              width={36}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail;
