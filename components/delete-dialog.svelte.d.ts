import type { MouseEventHandler } from "svelte/elements";
type $$ComponentProps = {
    handleConfirm: MouseEventHandler<HTMLButtonElement>;
    message?: string;
    confirmPending?: boolean;
};
declare const DeleteDialog: import("svelte").Component<$$ComponentProps, {}, "">;
type DeleteDialog = ReturnType<typeof DeleteDialog>;
export default DeleteDialog;
