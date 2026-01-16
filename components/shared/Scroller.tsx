export default function Scroller() {
    return (
        <div className="relative flex justify-center h-[30px] w-[15px] border-2 border-black rounded-2xl">
            <div className="absolute w-[5px] h-[5px] rounded-full bg-black top-[5px] animate-scroll-dot" />
        </div>
    );
}

