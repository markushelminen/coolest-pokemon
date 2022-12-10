import { type NextPage } from "next";


const Home: NextPage = () => {

  return (
     <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center mb-2">Which Pokèmon is the Coolest?</div>
      <div className="border rounded p-8 flex items-center justify-between max-w-2xl">
        <div className="w-16 h-16 bg-red-200"></div>
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-200"></div>
      </div>
    </div>
  );
};

export default Home;
