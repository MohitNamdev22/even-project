import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import "./CardList.css"

const CardList = ()=>{
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef(null);
    

    useEffect(()=>{
        fetchCards(page);

    }, [page]);

    const fetchCards = async(page)=>{
        setLoading(true);
        try{
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
            console.log(response);
            setCards((prev)=>[...prev, ...response.data.results]);
        
        }
        catch(error){
            console.error('error', error);

        }
        setLoading(false);
    };

    useEffect(()=>{
        if(!observer.current){
            return;
        }
        const handleObserver = (entries) =>{
            const target = entries[0];
            if(target.isIntersecting){
                setPage((prev)=>prev+1);
            }
        };

        const observerInstance = new IntersectionObserver (handleObserver, {threshold:1});
        observerInstance.observe(observer.current);

        return () => observerInstance.disconnect();
    },[]);

    return(
        <div className="card-container">
            {cards.map((char, index)=>(
                <div key={char.id} className='card'>
                    <img src={char.image}/>
                    <h3>{char.name}</h3>
                    <p>Status: {char.status}</p>
                </div>
            ))}
            <div ref={observer} className='observer'>
            </div>
            {loading && <p> Loading....</p>}
        </div>

    );
}

export default CardList;