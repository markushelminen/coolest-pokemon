import Link from "next/link";
const AboutPage = () => {
  return (
    <div className="flex flex-col items-center text-xl">
      <h2 className="text-2xl p-4">About</h2>
      <p className="max-w-xl text-center">
        I made this following Theos tutorial with couple changes and newer Next.js and tRPC versions
      </p>
      <div className="p-4" />
        <p className="max-w-xl text-blue-600"><a href="https://www.youtube.com/watch?v=PKy2lYEnhgs">Link to the tutorial</a></p>
        <div className="">
            <Link href="/">Back</Link>
        </div>
    </div>
  );
};

export default AboutPage;