
const useAnimation = () => {
    
    /* =========================================================
       MOTION SETTINGS
    ========================================================= */

    const smoothEase = [0.22, 1, 0.36, 1];

    const fadeUp = {
        hidden: {
            opacity: 0,
            y: 24,
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.9,
                ease: smoothEase,
            },
        },
    };

    const heroContainer = {
        hidden: {},

        visible: {
            transition: {
                delayChildren: 0.15,
                staggerChildren: 0.14,
            },
        },
    };

    const heroItem = {
        hidden: {
            opacity: 0,
            y: 20,
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.9,
                ease: smoothEase,
            },
        },
    };

    const imageReveal = {
        hidden: {
            opacity: 0,
            scale: 0.985,
        },

        visible: {
            opacity: 1,
            scale: 1,

            transition: {
                duration: 1,
                ease: smoothEase,
            },
        },
    };
    return {
        smoothEase,
        fadeUp,
        heroContainer,
        heroItem,
        imageReveal
    };
}

export default useAnimation;