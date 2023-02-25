import Card from "./Card";
import { cardsData } from "../cards";
import React,{useEffect, useState} from "react";
import "../assets/css/index.css";
function Game() {
   
  const[cards , setCards]=useState(cardsData)
  const[pause , setPause]=useState(false)
  const[cardOne , setCardOne]=useState(null)
  const[cardTwo , setCardTwo]=useState(null)

  const handle=(card)=>{ 
    if(card.founded===true){
      return
    }
    card.isFlipped=true
    cardOne ? setCardTwo(card) : setCardOne(card)
  }
  useEffect(()=>{
    if(cardOne && cardTwo && cardOne!==cardTwo  ){
      if(cardOne.name===cardTwo.name){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.name===cardOne.name){ 
              return {...card,isFlipped:true,founded:true}
            }else{       
              return card       
            }    
          })        
        })
        reset()
      }else{
        setPause(true)
        setTimeout(() => {
          setCards(prevCards=>{
            return prevCards.map(card=>{
              if(card===cardOne||card===cardTwo){          
                return {...card,isFlipped:false}        
              }else{         
                return card    
              }  
            })
          })
          setPause(false)
        }, 1500);
        reset()  
      }  
    }
  },[cardOne,cardTwo])
  function reset(){
    setCardOne(null)
    setCardTwo(null)
  } 
  return (
    <>
      <section className="memory-game" style={pause?{pointerEvents:"none"}:{pointerEvents:"auto"}}>
        {cards.map((card)=>{
          return <Card card={card} key={card.id} onClick={()=> handle(card)}/> 
        })}
      </section>
    </>
  )
}

export default Game;
