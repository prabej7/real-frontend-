import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionB } from "@/components/user"
import { Search } from "lucide-react";



const Home: React.FC = () => {
    return <SectionB selected="Home"  >
        <div className="h-screen w-screen flex justify-center items-center"   >
            <div className="flex items-center justify-between w-screen px-12 pr-24" >
                <div>
                    <h1 className="text-7xl font-bold text-gradient" >Find your dream <br />  home today.</h1>
                    <div className="flex gap-6 mt-6" >
                        <Input placeholder="Search by city" />
                        <Button variant="sec"  >
                            Search<Search />
                        </Button>
                    </div>
                </div>
                <div>
                    <img src="/home.svg" className="rounded-full w-[400px] h-[400px] border" />
                </div>
            </div>
        </div>
    </SectionB>
};

export default Home;