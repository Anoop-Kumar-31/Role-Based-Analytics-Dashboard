const ProgressBar = ({ currentStep, title }) => (
  <div className="mb-6 pt-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-bold text-[var(--primary-accent)] uppercase tracking-wider">Step {currentStep} of 3</span>
      <span className="text-xs font-semibold text-[var(--text-tertiary)]">{title}</span>
    </div>
    <div className="h-1.5 w-full bg-[var(--filler)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--primary-accent)] transition-all duration-500 ease-out rounded-full"
        style={{ width: `${(currentStep / 3) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;
