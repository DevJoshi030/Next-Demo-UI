import { NextPage } from "next";
import Campaign from "@interfaces/Campaign";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  campaigns: Campaign[];
  error: string | null;
}

export const getStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/`);
    const campaigns: Campaign[] = await res.json();

    return {
      props: {
        campaigns: campaigns,
        error: null,
      },
      revalidate: 5,
    };
  } catch (err) {
    return {
      props: {
        campaigns: [],
        error: JSON.stringify(err),
      },
      revalidate: 5,
    };
  }
};

const Home: NextPage<HomeProps> = ({ campaigns, error }) => {
  return (
    <>
      <Head>
        <title>Available Campaigns</title>
      </Head>
      <main className="bg-back h-screen w-screen overflow-scroll text-white flex">
        <div className="flex flex-col content-center items-center flex-grow">
          <h1 className="text-2xl font-bold m-4 justify-self-start">
            Available Campaigns
          </h1>
          {error ? <h1>{JSON.parse(error).message}</h1> : null}
          {campaigns.map((campaign) => (
            <div key={campaign.slug} className="w-2/3 h-3/4 flex bg-card m-3">
              <div className="grid justify-items-stretch m-5 p-6">
                <Link href={`${campaign.slug}`}>
                  <div className="h-10 w-10 self-center justify-self-center md:h-20 md:w-20 cursor-pointer">
                    <Image
                      className="rounded-full"
                      src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE}/${campaign.logo}`}
                      alt="alt"
                      height={80}
                      width={80}
                    />
                  </div>
                </Link>
              </div>
              <div className="block flex-col content-start p-6">
                <Link href={`${campaign.slug}`}>
                  <h1 className="text-lg font-bold mt-2 mb-2 cursor-pointer">
                    {campaign.title}
                  </h1>
                </Link>
                <p className="w-full overflow-hidden mb-3">
                  {/* {campaign.description} */}
                  {
                    "You will build and use a component styling framework (much like Tailwind but for React Native), Learn Typescript, Redux (with Redux Toolkit). Deep Linking, Notifications, Multiple Language support, Gestures, Complete Authentication process with automatic Refresh token updates, Complete Deployment guide with Beta Testing, Release Management, Over the air updates, and much more."
                  }
                </p>
                <small className="text-sm">
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "full",
                    timeStyle: "long",
                  }).format(new Date(campaign.created_at))}
                </small>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
