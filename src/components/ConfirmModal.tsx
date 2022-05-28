import classNames from "classnames";
import * as React from "react";
import { IoClose } from "react-icons/io5";

type ConfirmModalProps = {
  toggleLabel: string;
  confirmLabel?: string;
  cancelLabel?: string;
  message: string;
  onSuccess?: () => boolean | Promise<boolean>;
  onCancel?: () => void;
};

export const ConfirmModal = ({
  toggleLabel,
  confirmLabel,
  cancelLabel,
  message,
  onSuccess,
  onCancel,
}: ConfirmModalProps) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <>
      <a
        href="#!"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={(e) => {
          setShow(!show);
        }}
      >
        {toggleLabel}
      </a>

      <div
        className={classNames(
          "fixed top-0 left-0 bottom-0 right-0 z-50 flex flex-col items-center justify-center",
          { hidden: !show }
        )}
        onClick={(e) => {
          setShow(false);
        }}
      >
        <div
          className="relative w-full h-full max-w-md p-4 md:h-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <a
              href="#!"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={(e) => setShow(false)}
            >
              <IoClose />
            </a>

            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 select-none dark:text-gray-400">
                {message}
              </h3>
              <a
                href="#!"
                data-modal-toggle="popup-modal"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  if (!onSuccess) return setShow(false);
                  const result = onSuccess();
                  if (typeof result === "boolean" && Boolean(result)) {
                    return setShow(false);
                  } else if (
                    Object.prototype.toString.call(result) ===
                    "[object Promise]"
                  ) {
                    (result as Promise<boolean>).then((close) => {
                      if (close) return setShow(false);
                    });
                  }
                }}
              >
                {confirmLabel ?? "Confirm"}
              </a>
              <a
                href="#!"
                data-modal-toggle="popup-modal"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  onCancel?.();
                  return setShow(false);
                }}
              >
                {cancelLabel ?? "Cancel"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
