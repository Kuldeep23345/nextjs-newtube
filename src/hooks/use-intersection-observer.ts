import { useEffect,useRef,useState } from "react";

export const useIntersectionObserver = (options?:IntersectionObserverInit)=>{
    const [isIntersecting,setIsIntersecting] = useState(false)
    const tragetRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            setIsIntersecting(entry.isIntersecting);
        },options)
        if(tragetRef.current){
            observer.observe(tragetRef.current)
        }
        return () => observer.disconnect();
    },[options])
    return {tragetRef,isIntersecting}
}