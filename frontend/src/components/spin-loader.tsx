interface SpinLoaderProps {
    size: number
}

function SpinLoader({size}: SpinLoaderProps) {
    return (
        <>
            <style>
                {`
                    .loader {
                      width: ${size}px;
                      height: ${size}px;
                      border-radius: 50%;
                      display: inline-block;
                      border-top: 3px solid var(--card-foreground);
                      border-right: 3px solid transparent;
                      box-sizing: border-box;
                      animation: rotation 1s linear infinite;
                    }
                    
                    @keyframes rotation {
                      0% {
                        transform: rotate(0deg);
                      }
                      100% {
                        transform: rotate(360deg);
                      }
                    } 
            `}
            </style>
            <span className="loader"></span>
        </>
    );
}

export default SpinLoader;