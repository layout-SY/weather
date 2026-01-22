export const LoadingSpinner = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      role="status"
      aria-label="loading"
    >
      <svg
        className="block h-10 w-10 animate-spin text-current"
        viewBox="0 0 50 50"
        aria-hidden="true"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="90 60"
        />
      </svg>
    </div>
  );
};
