import banner from "../../assets/homeBanner.png";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Task Manager | Home</title>
      </Helmet>
      {/* Banner Section */}
      <section className="bg-blue-500 text-white py-10">
        <div className="container mx-auto text-center">
          <img
            src={banner}
            alt="Inspiring Workspace or Collaborative Setting"
            className="w-full h-auto max-w-screen-lg mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">
            Unlock Productivity with{" "}
            <span className="text-red-400">Task Manager</span>
          </h1>
          <p className="text-lg mb-8">Simplify Your Workflow, Achieve More!</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
