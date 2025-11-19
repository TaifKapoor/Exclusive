// components/common/SectionHeader.jsx
const SectionHeader = ({ badgeText, title }) => {
  return (
    <div className="flex flex-col mb-10">
      
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-4 h-8 bg-primary rounded-sm"></div>
        <span className="text-primary font-semibold text-sm">{badgeText}</span>
      </div>
      
      
      <h2 className="text-4xl font-semibold text-foreground">{title}</h2>
    </div>
  );
};

export default SectionHeader;