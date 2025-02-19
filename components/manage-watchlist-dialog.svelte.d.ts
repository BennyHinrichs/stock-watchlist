import type { EventHandler } from "svelte/elements";
type $$ComponentProps = {
    mode: "add" | "edit";
    handleSubmit: EventHandler<SubmitEvent, HTMLFormElement>;
    watchlistName?: string;
    submitPending?: boolean;
};
declare const ManageWatchlistDialog: import("svelte").Component<$$ComponentProps, {}, "">;
type ManageWatchlistDialog = ReturnType<typeof ManageWatchlistDialog>;
export default ManageWatchlistDialog;
