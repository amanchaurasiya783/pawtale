"use client";

import { AnimatePresence, motion } from "framer-motion";

type DeleteModalProps = {
    open: boolean;
    title?: string;
    message?: string;
    loading?: boolean;
    onClose: () => void;
    onDelete: () => void;
};

export default function DeleteModal({
    open,
    title = "Delete Product",
    message = "Are you sure you want to delete this product? This action cannot be undone.",
    loading = false,
    onClose,
    onDelete,
}: DeleteModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="border-b px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">
                                    🗑️
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {title}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Please confirm your action.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6">
                            <p className="leading-7 text-gray-600">
                                {message}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t px-6 py-5">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={onDelete}
                                disabled={loading}
                                className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Deleting..." : "Delete Product"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}