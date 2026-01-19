function StepLayout({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Next",
  backLabel = "Back",
  nextDisabled = false
}) {
  return (
    <div className="onboarding-step-page">
      <div className="onboarding-header">
        <h2>{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>

      <div className="onboarding-container">
        {children}
      </div>

      <div className="actions">
        {onBack && (
          <button className="secondary-btn" onClick={onBack}>
            {backLabel}
          </button>
        )}

        {onNext && (
          <button
            className="primary-btn"
            onClick={onNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default StepLayout;
