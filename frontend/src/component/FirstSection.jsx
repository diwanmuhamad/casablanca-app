import styles from "../style";
import { scrollvariants,slideIn } from "../const";
import { robot, chain1, chain2, chain3 } from "../assets";
import Button from "./Button";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const FirstSection = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col sm:py-6 py-6 `}>
      <motion.div 
        variants={slideIn('left', "spring", 0, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{once:true}}
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[80px] text-[52px] text-black-gradient ss:leading-[100.8px] leading-[75px]">
            AI Powered <br className="sm:block hidden" />{" "}
            <span className="text-gradient">UMKM</span>{" "}
          </h1>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[80px] text-[52px] text-black-gradient ss:leading-[100.8px] leading-[75px] w-full">
          Chatbot
        </h1>
        <p className={`${styles.paragraph} max-w-[500px] mt-5`}>
        Are you a small or medium enterprise seeking quick, accurate, and relevant information about the SME world? <br></br>Look no further! Introducing casablanca, your go-to chatbot designed to empower businesses like yours with a wealth of knowledge at your fingertips.
        </p>
        <Link to={{pathname: `/${localStorage.getItem('token')? "chat":"login"}`}} className="appearance-none"><Button styles="sm:mt-6 mt-6" /></Link>
      </motion.div>

      <motion.div
       variants={slideIn('right', "spring", 0, 0.5)}
       initial="hidden"
       whileInView="show"
       viewport={{once:true}} 
      className={`flex-1 flex ${styles.flexCenter} max-h-[600px] md:my-0 my-2 relative`}>
        <img src={chain3} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </motion.div>

    </section>
  );
};

export default FirstSection;