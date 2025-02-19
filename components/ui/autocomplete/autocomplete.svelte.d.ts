declare const Autocomplete: import("svelte").Component<{
    class?: string;
    name?: string;
    options?: {
        label: string;
        value: any;
    }[];
    value?: {
        label: string;
        value: any;
    } | null;
    placeholder?: string;
    disabled?: boolean;
    emptyMessage?: string;
    onValueChange?: Function;
}, {}, "">;
type Autocomplete = ReturnType<typeof Autocomplete>;
export default Autocomplete;
