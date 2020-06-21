import React from "react";

import { CSSTransitionGroup } from 'react-transition-group'
import Icon from "@mdi/react";
import {
    mdiAlertCircle,
    mdiInformation,
    mdiAlert,
    mdiCheckCircle,
} from "@mdi/js";

export default function NotificationPanel({type, title, message, additionalClasses = {}, show = false, onClose = ()=> {} }) {
    let className="bg-teal-100 border-teal-500 text-teal-900";
    let icon=<Icon className="fill-current h-6 w-6 text-teal-500 mr-4" path={mdiInformation} size={1}></Icon>;
    if (type === "error") {
        className="bg-red-100 border-red-500 text-red-900";
        icon=<Icon className="fill-current h-6 w-6 text-red-500 mr-4" path={mdiAlertCircle} size={1}></Icon>;
    } else if (type === "success") {
        className="bg-green-100 border-green-500 text-green-900";
        icon=<Icon className="fill-current h-6 w-6 text-green-500 mr-4" path={mdiCheckCircle} size={1}></Icon>;
    } else if (type === "warn") {
        className="bg-orange-100 border-orange-500 text-orange-900";
        icon=<Icon className="fill-current h-6 w-6 text-orange-500 mr-4" path={mdiAlert} size={1}></Icon>;
    }

  return (
    <CSSTransitionGroup
    transitionName="example"
    transitionEnter={true}
    transitionEnterTimeout={300}
    transitionLeave={true}
    transitionLeaveTimeout={300}>
    {show ? (
        <div
      className={`fixed z-20 w-full top-70px right-0 max-w-lg border-t-4 rounded-b px-4 py-3 shadow-md ${className} ${additionalClasses ?? ""}`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          {icon}
        </div>
        <div>
          <p className="font-bold">{title}</p>
          {message ?? <p className="text-sm">{message}</p>}
        </div>
      </div>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=> onClose()}>
        <svg className="fill-current h-6 w-6 text-gray-800" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Fechar</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
    </span>
    </div>
    ) : null }
  </CSSTransitionGroup>
  );
}
