import {
    mdiCheckCircle,
    mdiCloseCircle,
    mdiInformationOutline,
    mdiClose,
} from "@mdi/js";
import Icon from "@mdi/react";

const Alert = ({ message, options, close }) => {
    return (
        <div className="flex items-center bg-white border border-red-300 px-2 py-4 z-50 pointer-events-auto">
            {options.type === "info" && (
                <Icon
                    path={mdiInformationOutline}
                    className="icon-medium text-pink-300"
                />
            )}
            {options.type === "success" && (
                <Icon
                    path={mdiCheckCircle}
                    className="icon-medium text-pink-300"
                />
            )}
            {options.type === "error" && (
                <Icon
                    path={mdiCloseCircle}
                    className="icon-medium text-pink-300"
                />
            )}
            <span style={{ flex: 2 }}>{message}</span>
            <div
                className="hover:text-red-100 rounded-full btn-icon m-1"
                title="Dismiss"
                onClick={close}
            >
                <Icon path={mdiClose} className="icon-small text-pink-300" />
            </div>
        </div>
    );
};

export default Alert;
