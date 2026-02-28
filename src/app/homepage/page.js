import ShopByCategory from "./shopbycategory/page";
import PetCareBlog from "./petcareblog/page";
import ReelsSection from "./reelssection/page";
import AboutUs from "./aboutus/page";
import Hero from "./hero/page";
import "react-loading-skeleton/dist/skeleton.css";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ShopByCategory />
      <PetCareBlog />
      <ReelsSection />
      <AboutUs />
    </div>
  );
};

export default HomePage;
