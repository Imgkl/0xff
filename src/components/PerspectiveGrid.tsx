const PerspectiveGrid = () => {
  return (
    <div className="absolute inset-0 w-[140%] h-[900px] -left-[20%] bottom-0 overflow-hidden">
      <div 
        className="w-full h-full"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, rgba(221, 111, 69, 0.05) 15%, rgba(221, 111, 69, 0.25) 100%),
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(221, 111, 69, 0.3) 80px, rgba(221, 111, 69, 0.3) 81px),
            repeating-linear-gradient(180deg, transparent, transparent 80px, rgba(221, 111, 69, 0.3) 80px, rgba(221, 111, 69, 0.3) 81px)
          `,
          transform: 'perspective(1500px) rotateX(70deg) translateY(100px) scale(3)',
          transformOrigin: 'bottom'
        }}
      />
    </div>
  );
};

export default PerspectiveGrid;
