'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { VscChromeClose } from 'react-icons/vsc';

const AnimatedHamburgerIcon = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

  // Animation variants for a smooth fade and rotate transition
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -45 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, rotate: 45, transition: { duration: 0.2 } },
  };

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-8 h-8 relative z-50 flex items-center justify-center text-white"
      aria-label="Toggle Menu"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <VscChromeClose size={26} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FiMenu size={26} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default AnimatedHamburgerIcon;