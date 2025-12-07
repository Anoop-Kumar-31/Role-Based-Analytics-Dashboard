const ProgressBar = ({ step, title }) => (
  <div className="mb-6">
    <p className="bg-blue-600 text-white px-4 py-3 text-center text-lg font-semibold shadow rounded-lg">
      Step {step} / 3:  {title}
    </p>
  </div>
);

export default ProgressBar;
