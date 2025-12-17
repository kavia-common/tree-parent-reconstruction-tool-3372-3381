"use client";

type Props = {
  errors: string[];
  onClear?: () => void;
};

/**
 * PUBLIC_INTERFACE
 * ErrorAlert displays a styled list of error messages with an optional clear action.
 */
export default function ErrorAlert({ errors, onClear }: Props) {
  if (!errors?.length) return null;

  return (
    <div role="alert" className="alert">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[var(--error)]"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="alert-title mb-1">Validation errors</div>
          <ul className="alert-list list-disc pl-5 text-sm">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
        {onClear && (
          <button className="btn btn-ghost text-sm" onClick={onClear}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
