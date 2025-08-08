import { IEventBus } from "../services";

export const showSpinner: IEventBus = {
    from: 'any',
    to: 'spinner',
    message: { 
      isShowSpinner: true
    },
};

export const hideSpinner: IEventBus = {
    from: 'any',
    to: 'spinner',
    message: { 
      isShowSpinner: false
    },
};