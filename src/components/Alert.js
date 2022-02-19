import {
    mdiCheckCircle,
    mdiCloseCircle,
    mdiInformationOutline,
    mdiClose,
} from "@mdi/js";
import Icon from "@mdi/react";

const Alert = ({ message, options, close }) => {
    return (
        <div className="flex items-center gap-1 bg-background border border-primary-300 p-2 z-50 pointer-events-auto">
            {options.type === "info" && (
                <Icon
                    path={mdiInformationOutline}
                    className="icon-medium text-primary-200"
                />
            )}
            {options.type === "success" && (
                <Icon
                    path={mdiCheckCircle}
                    className="icon-medium text-primary-200"
                />
            )}
            {options.type === "error" && (
                <Icon
                    path={mdiCloseCircle}
                    className="icon-medium text-primary-200"
                />
            )}
            <span style={{ flex: 2 }}>{message}</span>
            <div
                className="hover:bg-primary-100 rounded-full btn-icon m-1"
                title="Dismiss"
                onClick={close}
            >
                <Icon path={mdiClose} className="icon-small text-primary-300" />
            </div>
        </div>
    );
};

export default Alert;
