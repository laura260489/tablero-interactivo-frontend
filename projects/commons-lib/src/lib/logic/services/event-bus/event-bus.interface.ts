
export interface IEventBus {
  from: string;
  to: string;
  route?: string;
  message: IMessage;
}

export interface IMessage {
  isShowMenu?: boolean;
  isShowHeader?:boolean;
  isShowSpinner?:boolean;
}
