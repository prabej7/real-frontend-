import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useUser } from "@/store";
import { User } from "lucide-react";

interface Props {
    title: string;
    links: string[];
    selected: string;
}

const Nav: React.FC<Props> = ({ links, title, selected }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    return <nav className="nav p-6 px-12 flex justify-between  items-center z-40" >
        <p className="font-bold text-2xl text-gradient" >{title}</p>
        <ul className="flex gap-6 font-light" >
            {links.map((link) => {
                return <li className={`${selected == link ? "text-indigo-500" : "text-slate-800"} cursor-pointer`} onClick={() => navigate(link == "Home" ? '/' : "/" + link.toLowerCase())} >{link}</li>
            })}
        </ul>
        {user?.id ? <div>
            <Button onClick={() => navigate('/account')} variant="outline" ><User />My Account</Button>
        </div> : <div className="flex items-center justify-center gap-6" >
            <Button className="bg-white text-slate-800 hover:bg-slate-50" onClick={() => navigate('/login')}  >Login</Button>
            <Button variant="primary" onClick={() => navigate("/register")}  >Signup </Button>
        </div>}

    </nav>
};

export default Nav;