"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Sermon } from "@/types";

interface SermonModalProps {
  sermon: Sermon | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SermonModal({
  sermon,
  isOpen,
  onClose,
}: SermonModalProps) {
  if (!sermon) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Video Embed */}
                <div className="aspect-video w-full mb-6">
                  <iframe
                    src={sermon.videoUrl}
                    title={sermon.title}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    {sermon.title}
                  </Dialog.Title>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Preacher:</span>{" "}
                      {sermon.preacher}
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(sermon.date).toLocaleDateString()}
                    </div>
                    {sermon.duration && (
                      <div>
                        <span className="font-semibold">Duration:</span>{" "}
                        {sermon.duration}
                      </div>
                    )}
                    {sermon.series && (
                      <div>
                        <span className="font-semibold">Series:</span>{" "}
                        {sermon.series}
                      </div>
                    )}
                  </div>

                  {sermon.scriptureReferences &&
                    sermon.scriptureReferences.length > 0 && (
                      <div className="text-sm">
                        <span className="font-semibold">
                          Scripture References:
                        </span>{" "}
                        {sermon.scriptureReferences.join(", ")}
                      </div>
                    )}

                  <p className="text-gray-600">{sermon.description}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
