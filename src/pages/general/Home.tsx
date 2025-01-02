import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionB } from "@/components/user"
import { Search } from "lucide-react";

const BG_IMG = "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const Home: React.FC = () => {
    return <SectionB selected="Home"  >
        <div className="h-screen w-screen flex justify-center items-center" style={
            {
                backgroundImage: `url(${BG_IMG})`
            }
        }   >
            <div className="absolute bg-black z-10 h-screen w-screen opacity-25" ></div>
            <div className="flex items-center justify-between w-screen px-12 pr-24 z-20" >
                <div>
                    <h1 className="text-7xl font-bold text-white" >Find your dream <br />  home today.</h1>
                    <div className="flex gap-6 mt-6" >
                        <Input placeholder="Search by city" className="placeholder:text-white text-white" />
                        <Button variant="sec"  >
                            Search<Search />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    </SectionB>
};

export default Home;