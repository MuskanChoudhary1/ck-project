function Step({ number, children }) {
  return (
    <div className="step">
      <span className="step-number">{number}</span>
      <div>{children}</div>
    </div>
  );
}

export default Step;
