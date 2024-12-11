import Spinner from "./Spinner";

const LoadingPage: React.FC = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center absolute z-50 bg-white">
            <div className="flex items-center gap-2">
                <Spinner />
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
