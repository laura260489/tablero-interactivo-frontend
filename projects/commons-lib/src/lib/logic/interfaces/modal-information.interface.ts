export interface ModalConfig {
    message: string;
    showButton: boolean;
    buttonConfig: ButtonConfig
}

export interface ButtonConfig {
    label: string;
    navigate: string;
}