import { useEffect, useState } from "react";
import Cards from "./partials/Cards";
import Footer from "./partials/Footer";
import Nav from "./partials/Nav";
import { currentUserService } from "../API/userService";
import { getAllProperties } from "../API/propertyServices";
import { toast } from "react-toastify";

const Home = () => {
  const [allproperty, setAllproperty] = useState(null);

  console.log("property --->", allproperty);

  const fetchAllProperty = async () => {
    try {
      const res = await getAllProperties();
      setAllproperty(res?.data?.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProperty();
  }, []);

  return (
    <div className="bg-zinc-50 pt-24 relative w-full h-full">
      <h1 className="text-center mt-10 text-[4.5vw]">
        Experience the <span className="text-[#b17f44]">Aura</span> <br /> of
        Elegance.
      </h1>
      <Cards data={allproperty} />

      <Footer />
    </div>
  );
};

export default Home;
