const PerspectiveGrid = () => {
  return (
    <div className="absolute inset-0 w-[135%] -left-[10%] overflow-hidden">
      <div 
        className="w-full h-full"
        style={{
          background: `
            linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 20%),
            linear-gradient(to bottom, transparent 0%, rgba(221, 111, 69, 0.02) 15%, rgba(221, 111, 69, 0.15) 100%),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(221, 111, 69, 0.15) 30px, rgba(221, 111, 69, 0.15) 31px),
            repeating-linear-gradient(180deg, transparent, transparent 30px, rgba(221, 111, 69, 0.15) 30px, rgba(221, 111, 69, 0.15) 31px)
          `,
          transform: 'perspective(1600px) rotateX(72deg) translateY(10px) scale(3)',
          transformOrigin: 'bottom'
        }}
      />
    </div>
  );
};

export default PerspectiveGrid;
