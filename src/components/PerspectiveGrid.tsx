const PerspectiveGrid = () => {
  return (
    <div className="absolute inset-0 w-[135 %] h-[910px] -left-[10%] bottom-0 overflow-hidden">
      <div 
        className="w-full h-full"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, rgba(221, 111, 69, 0.05) 15%, rgba(221, 111, 69, 0.25) 100%),
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(221, 111, 69, 0.3) 80px, rgba(221, 111, 69, 0.3) 81px),
            repeating-linear-gradient(180deg, transparent, transparent 80px, rgba(221, 111, 69, 0.3) 80px, rgba(221, 111, 69, 0.3) 81px)
          `,
          transform: 'perspective(1600px) rotateX(72deg) translateY(10px) scale(3)',
          transformOrigin: 'bottom'
        }}
      />
    </div>
  );
};

export default PerspectiveGrid;
