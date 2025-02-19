interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const CommandDialog: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    preventScroll?: boolean | undefined;
    closeOnEscape?: boolean | undefined;
    closeOnOutsideClick?: boolean | undefined;
    onOutsideClick?: ((event: PointerEvent | MouseEvent | TouchEvent) => void) | undefined;
    portal?: (HTMLElement | string | null) | undefined;
    open?: boolean | undefined;
    onOpenChange?: import("bits-ui/dist/internal").OnChangeFn<boolean> | undefined;
    openFocus?: import("bits-ui").FocusProp | undefined;
    closeFocus?: import("bits-ui").FocusProp | undefined;
} & {
    state?: import("svelte/store").Writable<import("cmdk-sv").State> | undefined;
    label?: string | undefined;
    shouldFilter?: boolean | undefined;
    filter?: ((value: string, search: string) => number) | undefined;
    value?: string | undefined;
    onValueChange?: ((value: string) => void) | undefined;
    loop?: boolean | undefined;
    ids?: Partial<import("cmdk-sv").CommandIds> | undefined;
} & import("cmdk-sv/dist/internal").HTMLDivAttributes & {
    onKeydown?: (e: KeyboardEvent) => void;
    asChild?: boolean;
}, {
    default: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type CommandDialog = InstanceType<typeof CommandDialog>;
export default CommandDialog;
