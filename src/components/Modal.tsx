import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { MealDetail } from "../lib/types";

type ModalProps = {
  meal: MealDetail;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  isLoading: boolean;
};

export const Modal = ({
  meal,
  isOpen,
  onClose,
  title,
  isLoading,
}: ModalProps) => {
  const modalRoot = document.getElementById("modal-root") ?? document.body;
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  // Autofocus the dialog on open
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (
          dialogRef.current &&
          !dialogRef.current.contains(e.target as Node)
        ) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-xl rounded-2xl bg-white shadow-xl outline-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-3 pb-0">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title ?? "Details"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        <div className="px-5 py-4">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-48 w-full rounded-lg bg-gray-200" />
              <div className="mt-3 h-4 w-2/3 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-full rounded bg-gray-200" />
              <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />
            </div>
          ) : meal ? (
            <div className="space-y-3">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full object-cover mb-4"
              />
              <div className="text-sm text-gray-600">
                <span className="mr-2 rounded-full bg-gray-100 px-2 py-1">
                  {meal.strCategory}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-1">
                  {meal.strArea}
                </span>
              </div>
              <p className="text-sm leading-6 whitespace-pre-line">
                {meal.strInstructions}
              </p>
            </div>
          ) : (
            <p>No details found.</p>
          )}
        </div>
      </div>
    </div>,
    modalRoot
  );
};
